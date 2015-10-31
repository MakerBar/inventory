var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
require('selectize');

var ItemModels = require('./models');

module.exports = {

    CreateView: Backbone.View.extend({
        template: _.template($('#item-update-template').html()),

        events: {
            'click .save': 'create_item'
        },

        render: function() {
            this.$el.html(this.template({item: {}}));

            this.$el.find('.tags').selectize({
                delimiter: ',',
                persist: false,
                create: function(input) {
                    return {
                        value: input,
                        text: input
                    };
                }
            });

            this.delegateEvents();
            return this;
        },

        create_item: function() {
            var name = this.$el.find('.name').val();
            var quantity = parseInt(this.$el.find('.quantity').val());
            var new_item_vals = {
                name: name,
                quantity: quantity
            };

            var item = new ItemModels.Create();
            item.save(new_item_vals);

            Backbone.history.navigate('', {trigger:true});
        }
    }),

    UpdateView: Backbone.View.extend({
        template: _.template($('#item-update-template').html()),

        events: {
            'click .save': 'update_item',
            'click .delete': 'delete_item',
        },

        render: function() {
            this.$el.html(this.template({
                item: this.item.toJSON()
            }));

            this.delegateEvents();
            return this;
        },

        update_item: function() {
            var name = this.$el.find('.name').val();
            var quantity = parseInt(this.$el.find('.quantity').val());
			var updated_item_vals = {
                id: this.item.get('id'),
				name: name,
				quantity: quantity
			};

            var update_item = new ItemModels.Update(updated_item_vals);
            update_item.save();

            Backbone.history.navigate('', {trigger:true});
        },

        delete_item: function() {
            var delete_item = new ItemModels.Delete({
                id: this.item.get('id')
            });
            delete_item.destroy();

            Backbone.history.navigate('', {trigger:true});
        }
    })
};

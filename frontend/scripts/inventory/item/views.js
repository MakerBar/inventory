var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var Models = require('./models');

module.exports = {

	CreateView: Backbone.View.extend({
		template: _.template($('#item-create-template').html()),

		events: {
			'click .create': 'create_item'
		},

		create_item: function() {
			var name = this.$el.find('.name').val();
			var quantity = parseInt(this.$el.find('.quantity').val());
			var new_item_vals = {
				name: name,
				quantity: quantity
			};

			var item = new Models.CreateModel();
			item.save(new_item_vals);
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		}
	}),

    UpdateView: Backbone.View.extend({
        template: _.template($('#item-update-template').html()),

        render: function() {
            this.$el.html(this.template({
                item: this.item.toJSON()
            }));
            return this;
        },
    })
};

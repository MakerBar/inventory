var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ =$;

var ItemCollections = require('./item/collections');


module.exports = {

    View: Backbone.View.extend({
        template: _.template($('#search-template').html()),

        events: {
			'click #create-item': 'create_item',
            'keyup #search-box': 'suggestions'
        },

        render: function() {
            this.$el.html(this.template());
			this.$search_box = this.$el.find('#search-box');
            return this;
        },

		create_item: function(e) {
			Backbone.history.navigate('item/create', {trigger:true});
		},

        suggestions: function(e) {
            var query_string = this.$search_box.val();

            var params = {
                type: 'GET',
                data: {
                    query_string: query_string
                }
            };

            var suggestions = new ItemCollections.Suggestions();
            suggestions.fetch(params).done(function() {
               console.log(suggestions); 
            });
        },
    }),
};

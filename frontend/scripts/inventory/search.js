var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ =$;

var Suggestions = require('./suggestions');

module.exports = {

    View: Backbone.View.extend({
        template: _.template($('#search-template').html()),

        suggestions_view: new Suggestions.View(),

        events: {
            'keyup #search-box': 'suggestions'
        },

        render: function() {
            this.$el.html(this.template());
			this.$search_box = this.$el.find('#search-box');
            return this;
        },

        suggestions: function(e) {
            var query_string = this.$search_box.val();

            this.suggestions_view.get_suggestions(query_string);
        },
    }),
};

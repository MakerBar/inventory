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
            'keyup': 'suggestions'
        },

        suggestions: function(e) {
            var query_string = 'test';

            this.suggestions_view.get_suggestions(query_string);
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        }
    }),
};

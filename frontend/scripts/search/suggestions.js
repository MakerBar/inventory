var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ =$;

module.exports = {

    View: Backbone.View.extend({
        template: _.template($('#suggestions-template').html()),

        suggestions: [],

        get_suggestions: function(query_string) {
            $.get('suggestions', {query_string: query_string}, function(data) {
                this.suggestions = data.suggestions;
                this.render();    
            });
        },

        render: function() {
            this.$el.html(this.template(this.suggestions));
            return this;
        }
    }),

};

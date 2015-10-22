var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ =$;

module.exports = {

    View: Backbone.View.extend({
        template: _.template($('#suggestion-template').html()),

        suggestions: [],

        render: function() {
          	//this.$el.html(this.template(this.suggestions));
            return this;
        },

        get_suggestions: function(query_string) {
			var view_this = this;

            $.get('suggestions', {query_string: query_string}, function(data) {
                view_this.suggestions = data.suggestions;
                view_this.render();
            });
        },
    }),
};

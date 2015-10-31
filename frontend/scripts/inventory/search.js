var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ =$;

var ItemCollections = require('./item/collections');


module.exports = {

    View: Backbone.View.extend({
        template: _.template($('#search-template').html()),
        suggestion_template: _.template($('#suggestion-template').html()),
        suggestions_none_template: _.template($('#suggestions-none-template').html()),
        suggestions_loading_template: _.template($('#suggestions-loading-template').html()),
        suggestions_error_template: _.template($('#suggestions-error-template').html()),

        events: {
            'keyup #search-box': 'suggestions',
            'click .suggestion': 'select_suggestion',
			'click #create-item': 'create_item',
        },

        render: function() { 
            this.$el.html(this.template());

			this.$search_box = this.$el.find('#search-box');
            this.$suggestions = this.$el.find('#suggestions');
            this.$suggestions_loading = $(this.suggestions_loading_template());
            this.$suggestions_none = $(this.suggestions_none_template());
            this.$suggestions_error = $(this.suggestions_error_template());

            this.delegateEvents();
            return this;
        },

        append_suggestion: function(item) {
            this.$suggestions.append(
                this.suggestion_template({
                    item: item.toJSON()
                })
            );
        },

        render_suggestions_none: function() {
            this.$suggestions.html(this.$suggestions_none);
        },

        render_suggestions_loading: function() {
            this.$suggestions.html(this.$suggestions_loading);
        },

        render_suggestions_error: function() {
            this.$suggestions.html(this.$suggestions_error);
        },

        suggestions: function(e) {
            var query_string = this.$search_box.val();

            if(query_string.length === 0) {
                this.$suggestions.html('');
                return;
            }

            this.render_suggestions_loading();

            var params = {
                type: 'GET',
                data: {
                    query_string: query_string
                }
            };

            var view_this = this;
            var suggestions = new ItemCollections.Suggestions();

            suggestions.fetch(params).done(function() {

                if( suggestions.length > 0 ) {
                    view_this.$suggestions.html('');
                    suggestions.each(function(item) {
                        view_this.append_suggestion(item);
                    });
                }
                else {
                    view_this.render_suggestions_none();   
                }

            })
            .fail(function() {
                view_this.render_suggestions_error();
            });
        },

        select_suggestion: function(e) {
            var item_id = $(e.target).data('id');
            Backbone.history.navigate('item/update/' + item_id, {trigger:true});
        },

		create_item: function(e) {
			Backbone.history.navigate('item/create', {trigger:true});
		},
    }),
};

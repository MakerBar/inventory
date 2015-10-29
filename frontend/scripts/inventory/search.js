var $ = require('jquery');
var jQuery = $;
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var typeahead = require('typeahead.js-browserify');
typeahead.loadjQueryPlugin();
var Bloodhound = typeahead.Bloodhound;

var ItemCollections = require('./item/collections');


module.exports = {

    View: Backbone.View.extend({
        template: _.template($('#search-template').html()),
        suggestion_template: _.template($('#suggestion-template').html()),

        events: {
			'click #create-item': 'create_item',
        },

        initialize: function() {
            this.bloodhound = new Bloodhound({
                identify: function(o) { return o.id; },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                dupDetector: function(a, b) { return a.id === b.id; },
                remote: {
                    url: 'item/suggestions/?query_string=%QUERY',
                    wildcard: '%QUERY'
                }
            });
        },

        render: function() {
            this.$el.html(this.template());
			this.$search_box = this.$el.find('#search-box');

            this.$search_box.typeahead({
                minLength: 0,
                classNames: {
                    open: 'is-open',
                    empty: 'is-empty',
                    cursor: 'is-active',
                    suggestion: 'Typeahead-suggestion',
                    selectable: 'Typeahead-selectable'
                }
            },
            {
                source: this.bloodhound,
                displayKey: 'screen_name',
                templates: {
                    suggestion: this.suggestion_template,
                    empty: this.suggestion_template
                }
            })
            .on('typeahead:asyncrequest', function() {
                $('.Typeahead-spinner').show();
            })
            .on('typeahead:asynccancel typeahead:asyncreceive', function() {
                $('.Typeahead-spinner').hide();
            });

            return this;
        },

		create_item: function(e) {
			Backbone.history.navigate('item/create', {trigger:true});
		},
    }),
};

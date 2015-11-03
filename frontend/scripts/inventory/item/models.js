var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = {

	Create: Backbone.Model.extend({
		urlRoot: 'item/create/',
	}),

    Retrieve: Backbone.Model.extend({
        urlRoot: 'item'
    }),

	Update: Backbone.Model.extend({
        url: function() {
            return 'item/update/' + this.get('id');
        }
	}),

    Delete: Backbone.Model.extend({
        url: function() {
            return 'item/delete/' + this.get('id');
        }
    }),

    Suggestion: Backbone.Model.extend({
        defaults: {
            'id': 0,
            'name': ''
        }
    }),
};

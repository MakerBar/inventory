var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = {

	Create: Backbone.Model.extend({
		urlRoot: 'item/create/',

        defaults: {
            'name': '',
            'quantitiy': 0
        }
	}),

	Update: Backbone.Model.extend({
		url: function() {
			return 'item/update/' + this.get('id');
		}
	}),

    Suggestion: Backbone.Model.extend({
        defaults: {
            'id': 0,
            'name': ''
        }
    }),
};

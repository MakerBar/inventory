var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = {

	CreateModel: Backbone.Model.extend({
		urlRoot: 'item/create/'
	}),

	UpdateModel: Backbone.Model.extend({
		url: function() {
			return 'item/update/' + this.get('id');
		}
	}),
};

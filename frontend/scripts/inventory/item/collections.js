var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var ItemModels = require('./models');

module.exports = {
    
    Suggestions: Backbone.Collection.extend({
        model: ItemModels.Suggestion,
        url: 'item/suggestions/'
    }),
};

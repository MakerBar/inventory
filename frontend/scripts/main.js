var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ =$;

var Search = require('./search');

$(function() {
    var SearchView = new Search.View();

    var $main_container = $('#main-container');

    var Router = Backbone.Router.extend({
        routes: {
            'search': 'search',
        },

        search: function() {
            SearchView.render();
            $main_container.html(SearchView.$el);
        }
    });
});

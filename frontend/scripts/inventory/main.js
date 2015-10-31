var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var Search = require('./search');
var ItemModels = require('./item/models');
var ItemViews = require('./item/views');

$(function() {
    var SearchView = new Search.View();
    var ItemCreateView = new ItemViews.CreateView();
    var ItemUpdateView = new ItemViews.UpdateView();

    var $main_container = $('#main-container');

    var Router = Backbone.Router.extend({
        routes: {
            '': 'search',
            'item/create': 'item_create',
            'item/update/:item_id': 'item_update'
        },

        search: function() {
            SearchView.render();
            $main_container.html(SearchView.$el);
        },

        item_create: function() {
            ItemCreateView.render();
            $main_container.html(ItemCreateView.$el);
        },

        item_update: function(item_id) {
            var item = new ItemModels.Retrieve({id: item_id});
            item.fetch().done(function() {
                ItemUpdateView.item = item;
                ItemUpdateView.render();
                $main_container.html(ItemUpdateView.$el);
            });
        },
    });

    new Router();
    Backbone.history.start();
});

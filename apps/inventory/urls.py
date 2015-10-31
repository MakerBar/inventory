from django.conf.urls import url

from views import (SearchView,
                   SuggestionsView,
                   ItemCreateView,
                   ItemRetrieveView,
                   ItemUpdateView,
                   ItemDeleteView)

urlpatterns = [
    url(r'^$',
        SearchView.as_view(),
        name='search'),

    url(r'^item/suggestions/$',
        SuggestionsView.as_view(),
        name='suggestions'),

    url(r'^item/create/$',
        ItemCreateView.as_view(),
        name='item-create'),

    url(r'^item/(?P<pk>\d+)/$',
        ItemRetrieveView.as_view(),
        name='item-retrieve'),

    url(r'^item/update/(?P<pk>\d+)/$',
        ItemUpdateView.as_view(),
        name='item-update'),

    url(r'^item/delete/(?P<pk>\d+)/$',
        ItemDeleteView.as_view(),
        name='item-delete')
]

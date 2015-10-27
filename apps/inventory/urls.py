from django.conf.urls import url

from views import (SearchView,
                   SuggestionsView,
                   CreateItemView)

urlpatterns = [
    url(r'^$',
        SearchView.as_view(),
        name='search'),

    url(r'^item/suggestions/$',
        SuggestionsView.as_view(),
        name='suggestions'),

    url(r'^item/create/$',
        CreateItemView.as_view(),
        name='item-create'),
]

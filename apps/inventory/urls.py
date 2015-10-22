from django.conf.urls import url

from views import (SearchView,
                   SuggestionsView)

urlpatterns = [
    url(r'^$',
        SearchView.as_view(),
        name='search'),

    url(r'^suggestions/$',
        SuggestionsView.as_view(),
        name='suggestions'),
]

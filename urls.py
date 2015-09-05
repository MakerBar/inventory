from django.conf.urls import include, url
from django.contrib import admin

from apps.search import urls as search_urls

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^search/', include(search_urls.urlpatterns, namespace='search')),
]

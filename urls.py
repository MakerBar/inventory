from django.conf.urls import include, url
from django.contrib import admin

from apps.inventory import urls as inventory_urls

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^inventory/', include(inventory_urls.urlpatterns, namespace='inventory')),
]

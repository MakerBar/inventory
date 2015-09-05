from django.views.generic import TemplateView
from django.shortcuts import render

class SearchView(TemplateView):
    template_name = 'search/main.html'

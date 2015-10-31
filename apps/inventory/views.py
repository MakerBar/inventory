from django.views.generic import TemplateView

from rest_framework.generics import (ListAPIView, RetrieveAPIView,
                                     CreateAPIView, UpdateAPIView,
                                     DestroyAPIView)

from models import Item
from serializers import ItemSerializer, ItemSuggestionSerializer

from constants import DEFAULT_NUM_SUGGESTIONS, MAX_NUM_SUGGESTIONS


class SearchView(TemplateView):
    template_name = 'inventory/main.html'


class SuggestionsView(ListAPIView):
    serializer_class = ItemSuggestionSerializer

    def get_queryset(self):
        '''
        returns suggested items by name
        '''
        query_string = self.request.GET['query_string']

        if 'amount' in self.request.GET:
            amount = int(self.request.GET['amount'])
        else:
            amount = DEFAULT_NUM_SUGGESTIONS

        if amount > MAX_NUM_SUGGESTIONS:
            amount = MAX_NUM_SUGGESTIONS

        return Item.objects.filter(
            name__icontains=query_string)[:amount]


class ItemRetrieveView(RetrieveAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class ItemCreateView(CreateAPIView):
    serializer_class = ItemSerializer


class ItemUpdateView(UpdateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class ItemDeleteView(DestroyAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

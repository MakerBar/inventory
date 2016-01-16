from django.views.generic import TemplateView

from rest_framework.generics import (ListAPIView, RetrieveAPIView,
                                     CreateAPIView, UpdateAPIView,
                                     DestroyAPIView)

from models import Location, Item, ItemTag
from forms import LocationForm
from serializers import (LocationSerializer, ItemSerializer,
                         ItemSuggestionSerializer)

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


class LocationListView(ListAPIView):
    serializer_class = LocationSerializer


class LocationCreateView(CreateAPIView):
    serializer_class = LocationSerializer


class LocationUpdateView(UpdateAPIView):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()


class LocationDeleteView(DestroyAPIView):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()


class ItemRetrieveView(RetrieveAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def get(self, request, pk):
        response = super(ItemRetrieveView, self).get(request)

        id = response.data['id']
        item = Item.objects.get(id=id)

        tags = ItemTag.objects.filter(item=item).values_list(
            'tag', flat=True)

        response.data['tags'] = tags

        return response

class ItemCreateView(CreateAPIView):
    serializer_class = ItemSerializer

    def get_context_data(self, **kwargs):
        context['locations'] = LocationForm()

    def post(self, request):
        tags = request.data['tags']

        response = super(ItemCreateView, self).post(request)
        id = response.data['id']
        item = Item.objects.get(id=id)

        for tag in tags:
            item_tag = ItemTag()
            item_tag.tag = tag
            item_tag.item = item
            item_tag.save()

        return response


class ItemUpdateView(UpdateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def put(self, request, pk):
        tags = request.data['tags']

        response = super(ItemUpdateView, self).put(request)
        id = response.data['id']
        item = Item.objects.get(id=id)

        ItemTag.objects.filter(item=item).delete()

        for tag in tags:
            item_tag = ItemTag()
            item_tag.tag = tag
            item_tag.item = item
            item_tag.save()

        return response


class ItemDeleteView(DestroyAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def delete(self, request, pk):
        item = Item.objects.get(id=pk)
        ItemTag.objects.filter(item=item).delete()

        return super(ItemDeleteView, self).delete(request)

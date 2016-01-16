from rest_framework.serializers import ModelSerializer

from models import Location, Item

class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location

class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item

class ItemSuggestionSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name')

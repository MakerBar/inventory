from rest_framework.serializers import ModelSerializer

from models import Item


class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item


class ItemSuggestionSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ('name',)

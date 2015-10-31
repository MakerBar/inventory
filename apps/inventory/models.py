from django.db import models

from constants import NAME_MAX_LENGTH


class Item(models.Model):
    name = models.CharField(max_length=NAME_MAX_LENGTH)
    quantity = models.IntegerField(default=0, blank=False, null=False)
    location = models.CharField(max_length=NAME_MAX_LENGTH)


class ItemTag(models.Model):
    item = models.ForeignKey(Item)
    tag = models.CharField(max_length=NAME_MAX_LENGTH)

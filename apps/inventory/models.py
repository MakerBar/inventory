from django.db import models

from constants import NAME_MAX_LENGTH, DESCRIPTION_MAX_LENGTH

class Location(models.Model):
    name = models.CharField(max_length=NAME_MAX_LENGTH)
    description = models.CharField(max_length=DESCRIPTION_MAX_LENGTH)

class Item(models.Model):
    name = models.CharField(max_length=NAME_MAX_LENGTH)
    quantity = models.IntegerField(default=0, blank=False, null=False)
    location = models.ForeignKey(Location)

class ItemTag(models.Model):
    item = models.ForeignKey(Item)
    tag = models.CharField(max_length=NAME_MAX_LENGTH)

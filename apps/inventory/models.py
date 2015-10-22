from django.db import models

from constants import NAME_MAX_LENGTH

class Item(models.Model):
    name = models.CharField(max_length=NAME_MAX_LENGTH)
    quantity = models.IntegerField(default=0)
    

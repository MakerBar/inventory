from django import forms

from models import Location

class LocationForm(forms.Form):
    location = forms.IntegerField(
        widget=forms.Select(
            choices=Location.objects.all().values_list('id', 'name')
        )
    )

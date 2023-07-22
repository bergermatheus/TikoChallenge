"""Event forms for the project."""

from django import forms

from django.core.exceptions import ValidationError

from .models import Event

class EventForm(forms.ModelForm):
    """Events form."""

    update = forms.UUIDField(required=False)

    class Meta:
        model = Event
        fields = ['name', 'description', 'start', 'end', 'max_attendees']
        
        widgets = {
            'start': forms.DateTimeInput(attrs={'format': 'Y-m-d H:i:s'}),
            'end': forms.DateTimeInput(attrs={'format': 'Y-m-d H:i:s'}),
        }

    def clean(self):
        """Clean the form."""
        user = self.cleaned_data.get('user')
        name = self.cleaned_data.get('name')
        description = self.cleaned_data.get('description')
        start = self.cleaned_data.get('start')
        end = self.cleaned_data.get('end')

        # if start is not None and end is not None and start > end:
        #     raise ValidationError({'end': 'The end date must be after the start date.'})
        
        # if user is not None and start is not None:
"""Users admin settings for the project."""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from events.models import User, Event


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """User model admin."""
    list_display = ('name', 'username', 'password')


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    """Events model admin."""
    list_display = ('name','description', 'user', 'start', 'end')
"""Users admin settings for the project."""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from events.models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """User model admin."""
    list_display = ('name', 'email', 'password')

"""Users models for the project."""

import datetime
import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.template.defaultfilters import slugify
from django.urls import reverse


class User(AbstractUser):
    """User model."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, blank=True, null=True, verbose_name='name')
    username = models.EmailField(unique=True, verbose_name='username')
    password = models.CharField(max_length=150, blank=True, null=True, verbose_name='password')

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.name


class Event(models.Model):
    """Events model."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, blank=True, null=True, verbose_name='name')
    description = models.TextField(blank=True, null=True, verbose_name='description')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events', verbose_name='user')
    subscribers = models.ManyToManyField(User, related_name='subscribers', blank=True)
    max_attendees = models.PositiveIntegerField(default=0)
    start = models.DateTimeField(verbose_name='event start')
    end = models.DateTimeField(verbose_name='event end')

    def __str__(self):
        return self.name
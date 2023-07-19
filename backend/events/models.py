"""Users models for the project."""

import datetime
import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from django.urls import reverse


class User(AbstractUser):
    """User model."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, blank=True, null=True, verbose_name='name')
    email = models.EmailField(unique=True, verbose_name='email address')
    password = models.CharField(max_length=150, blank=True, null=True, verbose_name='password')

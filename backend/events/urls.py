"""URL settings for the project."""

from django.urls import path
from .views import (
    RegisterAPIView, EventAPIView, RefreshAPIView, LoginAPIView, EventCreateAPIView,
)

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register-view'),
    path('login/', LoginAPIView.as_view(), name='login-view'),
    path('refresh/', RefreshAPIView.as_view(), name='token-refresh'),
    path('events/', EventAPIView.as_view(), name='events-view'),
    path('create-events/',EventCreateAPIView.as_view(), name='create-events'),
]

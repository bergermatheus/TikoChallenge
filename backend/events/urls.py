"""URL settings for the project."""

from django.urls import path
from .views import RegisterAPIView, LoginAPIView, EventsAPIView, RefreshAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register-view'),
    path('login/', LoginAPIView.as_view(), name='login-view'),
    path('events/', EventsAPIView.as_view(), name='events-view'),
    path('refresh/', RefreshAPIView.as_view(), name='refresh-view')
]

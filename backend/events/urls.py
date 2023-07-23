"""URL settings for the project."""

from django.urls import path
from rest_framework import permissions
from .views import (
    RegisterAPIView, EventAPIView, RefreshAPIView, LoginAPIView, EventCreateAPIView,
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Tiko Events API",
      default_version='v1',
      description="API description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('register/', RegisterAPIView.as_view(), name='register-view'),
    path('login/', LoginAPIView.as_view(), name='login-view'),
    path('refresh/', RefreshAPIView.as_view(), name='token-refresh'),
    path('events/', EventAPIView.as_view(), name='events-view'),
    path('create-events/',EventCreateAPIView.as_view(), name='create-events'),
]

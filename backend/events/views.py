"""Events views for the project."""
from rest_framework.authentication import get_authorization_header
from rest_framework.response import Response
from django.core.serializers import serialize
from rest_framework.views import APIView
from rest_framework.exceptions import APIException, AuthenticationFailed

from .authentication import (
    create_access_token, create_refresh_token, decode_access_token,
    decode_refresh_token,
)
from .serializers import UserSerializer
from .models import User, Event
from .forms import EventForm


class RegisterAPIView(APIView):
    def post(self, request):
        """POST Method."""
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginAPIView(APIView):
    def post(self, request):
        """POST Method"""
        user = User.objects.filter(username=request.data['username']).first()
        if not user:
            raise APIException('Invalid credentials!')
        if not user.check_password(request.data['password']):
            raise APIException('Invalid credentials!')

        access_token = create_access_token(str(user.id))
        refresh_token = create_refresh_token(str(user.id))

        response = Response()
        response.set_cookie(
            key='refresh_token', value=refresh_token, httponly=True,
        )
        response.data = {
            'token': access_token
        }
        return response


class EventAPIView(APIView):
    def get(self, request):
        """GET Method"""
        auth = get_authorization_header(request).split()
        if not auth:
            raise AuthenticationFailed('Unauthenticated')
        token = auth[1].decode('utf-8')
        id = decode_access_token(token)

        events = Event.objects.all()
        events_list = [{
            'id': event.id,
            'name': event.name,
            'description': event.description
        } for event in events]
        return Response({'success': True, 'list': events_list})
    

class EventCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        """POST method."""
        auth = get_authorization_header(request).split()
        if not auth:
            raise AuthenticationFailed('Unauthenticated')
        
        token = auth[1].decode('utf-8')
        id = decode_access_token(token)
        user = User.objects.filter(pk=id).first()

        form = EventForm(request.data)
        if not form.is_valid():
            return Response({'success': False})
        

        event = Event.objects.filter(id=form.cleaned_data['update'])
        if event.exists():
            Event.objects.filter(id=form.cleaned_data['update']).update(
                name=form.cleaned_data['name'],
                description=form.cleaned_data['description'],
                user=user,
                start=form.cleaned_data['start'],
                end=form.cleaned_data['end'],
            )
        else:
            event = Event.objects.create(
                name=form.cleaned_data['name'],
                description=form.cleaned_data['description'],
                user=user,
                start=form.cleaned_data['start'],
                end=form.cleaned_data['end'],
            )
        return Response({
            'success': True,
            'name': event[0].name,
        })
        

class RefreshAPIView(APIView):
    def post(self, request):
        """POST Method"""
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token.split("'")[1])
        access_token = create_access_token(id)
        return Response({
            'token': access_token,
        })

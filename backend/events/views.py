"""Events views for the project."""
from django.utils import timezone
from rest_framework.authentication import get_authorization_header
from rest_framework.response import Response
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


class RefreshAPIView(APIView):
    def post(self, request):
        """POST Method"""
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token.split("'")[1])
        access_token = create_access_token(id)
        return Response({
            'token': access_token,
        })


class EventAPIView(APIView):
    def get(self, request):
        """GET method."""
        auth = get_authorization_header(request).split()
        if not auth:
            raise AuthenticationFailed('Unauthenticated')
        token = auth[1].decode('utf-8')
        id = decode_access_token(token)
        user = User.objects.filter(pk=id).first()

        events = Event.objects.all()
        events_list = [{
            'id': event.id,
            'name': event.name,
            'description': event.description,
            'subscribers': list(event.subscribers.all().values('name')),
            'max_attendees': event.max_attendees,
            'start': event.start,
            'end': event.end,
        } for event in events]

        events = Event.objects.filter(user=user)
        my_events_list = [{
            'id': event.id,
            'name': event.name,
            'description': event.description,
            'subscribers': list(event.subscribers.all().values('name')),
            'max_attendees': event.max_attendees,
            'start': event.start,
            'end': event.end,
        } for event in events]

        return Response({
            'success': True,
            'all_events': events_list,
            'my_events': my_events_list,
        })
    
    def post(self, request, *args, **kwargs):
        """POST method."""
        auth = get_authorization_header(request).split()
        if not auth:
            raise AuthenticationFailed('Unauthenticated')

        token = auth[1].decode('utf-8')
        id = decode_access_token(token)
        user = User.objects.filter(pk=id).first()
        event = Event.objects.filter(id=request.data['id'])

        if not event.exists():
            return Response({
                'success': False,
                'reason': 'Event does not exist.',
            })

        event = event[0]

        # Check if the event is over
        current_datetime = timezone.now()
        if event.end < current_datetime:
            return Response({
                'success': False,
                'reason': 'Event is over. Cannot subscribe.',
            })

        # Check if the event is at max attendees
        if event.subscribers.count() >= event.max_attendees:
            return Response({
                'success': False,
                'reason': 'Event is already at maximum attendees. Cannot subscribe.',
            })

        if eval(request.data['subscribe']):
            event.subscribers.add(user)
            return Response({
                'success': True,
                'subscribed': True,
            })
        else:
            event.subscribers.remove(user)
            event.save()
            return Response({
                'success': True,
                'subscribed': False,
            })


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
        

        event = Event.objects.filter(
            id=form.cleaned_data['update'], user=user
        )
        if form.cleaned_data['update'] and not event.exists():
            raise AuthenticationFailed('Not allowed to update')
        elif event.exists():
            Event.objects.filter(id=form.cleaned_data['update']).update(
                name=form.cleaned_data['name'],
                description=form.cleaned_data['description'],
                user=user,
                start=form.cleaned_data['start'],
                end=form.cleaned_data['end'],
                max_attendees=form.cleaned_data['max_attendees'],
            )
        else:
            event = Event.objects.create(
                name=form.cleaned_data['name'],
                description=form.cleaned_data['description'],
                user=user,
                start=form.cleaned_data['start'],
                end=form.cleaned_data['end'],
                max_attendees=form.cleaned_data['max_attendees'],
            )
        return Response({
            'success': True
        })
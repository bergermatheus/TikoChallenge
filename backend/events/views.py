"""Events views for the project."""
from rest_framework.authentication import get_authorization_header
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import APIException, AuthenticationFailed

from .authentication import (
    create_access_token, create_refresh_token, decode_access_token,
    decode_refresh_token,
)
from .serializers import UserSerializer
from .models import User


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
        user = User.objects.filter(email=request.data['email']).first()
        if not user:
            raise APIException('Invalid credentials!')
        if not user.check_password(request.data['password']):
            raise APIException('Invalid credentials!')

        access_token = create_access_token(str(user.id))
        refresh_token = create_refresh_token(str(user.id))

        response = Response()
        response.set_cookie(
            key='refresh_token', value=refresh_token, httponly=True
        )
        response.data = {
            'token': access_token
        }
        return response


class EventsAPIView(APIView):
    def get(self, request):
        """GET Method"""
        auth = get_authorization_header(request).split()
        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()
            return Response(UserSerializer(user).data)
        raise AuthenticationFailed('Unauthenticated')


class RefreshAPIView(APIView):
    def post(self, request):
        """POST Method"""
        refresh_token = request.COOKIES.get('refresh_token')
        # print(refresh_token.decode('utf-8'), flush=True)
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)
        return Response({
            'token': access_token,
        })

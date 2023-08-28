from django.contrib.auth.models import User
from knox.auth import TokenAuthentication
from knox.views import LoginView as KnoxLoginView
from rest_framework import viewsets, permissions
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import CreateAPIView

from readit_api.models import Post, Subreadit
from readit_api.serializers import (
    PostSerializer,
    SubreaditSerializer,
    UserSerializer,
)


class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = tuple()
    lookup_field = "username"


class CreateSubreaditView(CreateAPIView):
    serializer_class = SubreaditSerializer
    permission_classes = (permissions.IsAuthenticated,)


class SubscribedSubreaditViewSet(viewsets.ModelViewSet):
    serializer_class = SubreaditSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        username = self.kwargs.get("username")
        user = User.objects.get(username=username)
        return user.subscribes.all()


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = tuple()

    def get_queryset(self):
        username = self.kwargs.get("username")
        if not username:
            return Post.objects.all()
        return Post.objects.filter(posted_by__username=username)

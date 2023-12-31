from django.contrib.auth.models import User
from knox.views import LoginView as KnoxLoginView
from rest_framework import viewsets, permissions
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import CreateAPIView

from readit_api.models import Post
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


class UserPostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = tuple()

    def get_queryset(self):
        username = self.kwargs.get("username")
        return Post.objects.filter(posted_by__username=username)


class FrontPagePostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = tuple()

    def get_queryset(self):
        username = self.kwargs.get("username")
        user = User.objects.get(username=username) if username else None
        if user is None:  # TODO: Return trending posts from the past week
            return Post.objects.all()

        subscriptions = user.subscribes.all()
        return Post.objects.filter(posted_subreadit__in=subscriptions)

from django.contrib.auth.models import User
from knox.views import LoginView as KnoxLoginView
from rest_framework import viewsets, permissions
from rest_framework.authentication import BasicAuthentication

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


class SubreaditViewSet(viewsets.ModelViewSet):
    queryset = Subreadit.objects.all()
    serializer_class = SubreaditSerializer
    authentication_classes = tuple()


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = tuple()

    def get_queryset(self):
        username = self.kwargs.get("username")
        if not username:
            return Post.objects.all()
        return Post.objects.filter(posted_by__username=username)

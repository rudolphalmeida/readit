from typing import List

from django.contrib.auth.models import User, Group
from knox.auth import TokenAuthentication
from rest_framework import viewsets
from rest_framework import permissions
from knox.views import LoginView as KnoxLoginView
from rest_framework.authentication import BasicAuthentication

from readit_api.models import Post, Subreadit
from readit_api.serializers import (
    PostSerializer,
    SubreaditSerializer,
    UserSerializer,
    GroupSerializer,
)


class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class SubreaditViewSet(viewsets.ModelViewSet):
    queryset = Subreadit.objects.all()
    serializer_class = SubreaditSerializer
    permission_classes: List[type] = []


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes: List[type] = []

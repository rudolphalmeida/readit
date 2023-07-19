from typing import List

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from knox.models import AuthToken
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView


from readit_api.models import Post, Subreadit
from readit_api.serializers import (
    LoginSerializer,
    PostSerializer,
    SubreaditSerializer,
    UserSerializer,
    LoggedInUserSerializer,
    GroupSerializer,
)


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        token = AuthToken.objects.create(user)[1]

        return Response(
            {
                "user": LoggedInUserSerializer(
                    user, context=self.get_serializer_context()
                ).data,  # Get serialized User data
                "token": token,
            }
        )


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


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

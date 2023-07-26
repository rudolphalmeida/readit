from django.contrib.auth.models import User, Group
from knox.views import LoginView as KnoxLoginView
from rest_framework import viewsets, status, permissions
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from readit_api.models import Post, Subreadit
from readit_api.serializers import (
    PostSerializer,
    SubreaditSerializer,
    UserSerializer,
    UserDetailSerializer,
)


class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]


class UserDetailView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self, username):
        return get_object_or_404(User, username=username)

    def get(self, request, username, format=None):
        user = self.get_object(username)
        serializer = UserDetailSerializer(user, context={"request": request})
        return Response(serializer.data)

    def put(self, request, username, format=None):
        user = self.get_object(username)
        serializer = UserDetailSerializer(
            user, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, username, format=None):
        user = self.get_object(username)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    authentication_classes = tuple()


class SubreaditViewSet(viewsets.ModelViewSet):
    queryset = Subreadit.objects.all()
    serializer_class = SubreaditSerializer
    authentication_classes = tuple()


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = tuple()

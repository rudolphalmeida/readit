from django.contrib.auth.models import User, Group
from rest_framework import serializers

from readit_api.models import Post, Subreadit


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            "url",
            "username",
            "email",
            "groups",
            "subscribes",
            "owns",
            "posts",
        ]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class SubreaditSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Subreadit
        fields = ["name", "creator", "owner", "posts", "subscribers"]


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = [
            "title",
            "text",
            "posted_by",
            "created_on",
            "posted_subreadit",
        ]

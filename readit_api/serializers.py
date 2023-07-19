from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.contrib.auth import authenticate

from readit_api.models import Post, Subreadit


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def create(self, validated_data):
        return authenticate(**validated_data)

    def validate(self, data):
        user = authenticate(**data)
        if user:
            return data
        raise serializers.ValidationError("Incorrect Credentials")


class LoggedInUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            "url",
            "username",
            "email",
            "groups",
        ]


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

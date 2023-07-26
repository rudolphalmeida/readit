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
        ]


class SubreaditSerializer(serializers.ModelSerializer):
    creator = serializers.StringRelatedField()
    owner = serializers.StringRelatedField()

    class Meta:
        model = Subreadit
        fields = ["name", "creator", "owner"]


class PostSerializer(serializers.ModelSerializer):
    posted_by = UserSerializer()
    posted_subreadit = SubreaditSerializer()

    class Meta:
        model = Post
        fields = [
            "title",
            "text",
            "posted_by",
            "created_on",
            "posted_subreadit",
        ]


class UserDetailSerializer(serializers.HyperlinkedModelSerializer):
    created = SubreaditSerializer(many=True)
    subscribes = SubreaditSerializer(many=True)
    posts = PostSerializer(many=True)

    class Meta:
        model = User
        fields = [
            "url",
            "username",
            "email",
            "created",
            "subscribes",
            "posts",
        ]

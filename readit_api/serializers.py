from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.reverse import reverse

from readit_api.models import Post, Subreadit


class UserSerializer(serializers.ModelSerializer):
    posts_url = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name="user_posts",
        lookup_field="username",
        lookup_url_kwarg="username",
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "posts_url",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["posts_url"] = self.context["request"].build_absolute_uri(
            reverse("user_posts", kwargs={"username": instance.username})
        )
        return data


class SubreaditSerializer(serializers.ModelSerializer):
    creator = serializers.StringRelatedField()
    owner = serializers.StringRelatedField()

    class Meta:
        model = Subreadit
        fields = ["name", "creator", "owner"]


class PostSerializer(serializers.ModelSerializer):
    posted_by = serializers.SlugRelatedField(read_only=True, slug_field="username")
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

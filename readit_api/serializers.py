from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.reverse import reverse

from readit_api.models import Post, Subreadit


class UserSerializer(serializers.ModelSerializer):
    posts_url = serializers.URLField(read_only=True)
    subscribed_subreadits_url = serializers.URLField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "posts_url", "subscribed_subreadits_url"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["posts_url"] = self.context["request"].build_absolute_uri(
            reverse("user_posts", kwargs={"username": instance.username})
        )
        data["subscribed_subreadits_url"] = self.context["request"].build_absolute_uri(
            reverse("user_subscribes", kwargs={"username": instance.username})
        )
        return data


class SubreaditSerializer(serializers.ModelSerializer):
    creator = serializers.StringRelatedField()
    owner = serializers.StringRelatedField()

    class Meta:
        model = Subreadit
        fields = ["name", "creator", "owner"]

    def create(self, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        else:
            raise Exception("Expected a user with the request")
        validated_data["owner"] = user
        validated_data["creator"] = user
        subreadit = super(SubreaditSerializer, self).create(validated_data)
        subreadit.subscribers.add(user)
        subreadit.save()
        return subreadit


class PostSerializer(serializers.ModelSerializer):
    posted_by = serializers.SlugRelatedField(read_only=True, slug_field="username")
    posted_subreadit = serializers.SlugRelatedField(read_only=True, slug_field="name")

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "text",
            "posted_by",
            "created_on",
            "posted_subreadit",
            "url",
        ]

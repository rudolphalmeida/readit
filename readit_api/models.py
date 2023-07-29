from django.conf import settings
from django.contrib.auth.models import User
from django.db import models


class Subreadit(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)

    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="created",
    )

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="owns",
    )

    subscribers = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="subscribes",
    )

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"r/{self.name}"


class Post(models.Model):
    title = models.CharField(max_length=500, blank=False, null=False)

    # TODO: Expand this to include more types
    text = models.CharField(max_length=5000, blank=True, null=True)

    posted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posts",
    )

    created_on = models.DateTimeField(auto_now=True)

    # TODO: Add ability to cross-post later
    posted_subreadit = models.ForeignKey(
        Subreadit, on_delete=models.CASCADE, null=False, related_name="posts"
    )

    class Meta:
        ordering = ["created_on", "title"]

    def __str__(self) -> str:
        return self.title

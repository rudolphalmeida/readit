from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


def str_username(self):
    return f"u/{self.username}"


# Override the inbuilt `User`s `__str__` to print with a leading "u/"
User.add_to_class("__str__", str_username)


class Subreadit(models.Model):
    name = models.CharField(
        max_length=100,
        blank=False,
        null=False,
    )

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

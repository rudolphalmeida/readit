from django.urls import include, path
from rest_framework import routers

from readit_api import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"posts", views.UserPostsViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path(
        "posts/home",
        views.FrontPagePostsViewSet.as_view({"get": "list"}),
        name="general_home_posts",
    ),
    path(
        "posts/home/u/<str:username>",
        views.FrontPagePostsViewSet.as_view({"get": "list"}),
        name="user_home_posts",
    ),
    path(
        "posts/u/<str:username>",
        views.UserPostsViewSet.as_view({"get": "list"}),
        name="user_posts",
    ),
    path(
        "subreadits/",
        views.CreateSubreaditView.as_view(),
        name="subreadit_create",
    ),
    path(
        "subreadits/subscribed/u/<str:username>",
        views.SubscribedSubreaditViewSet.as_view({"get": "list"}),
        name="user_subscribes",
    ),
    path("", include(router.urls)),
    path(r"auth/login/", views.LoginView.as_view(), name="knox_login"),
    path(r"auth/", include("knox.urls")),
    path("api-auth/", include("rest_framework.urls")),
]

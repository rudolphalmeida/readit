from django.urls import include, path
from rest_framework import routers

from readit_api import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"subreadits", views.SubreaditViewSet)
router.register(r"posts", views.PostViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path(
        "posts/u/<str:username>",
        views.PostViewSet.as_view({"get": "list"}),
        name="user_posts",
    ),
    path("", include(router.urls)),
    path(r"auth/login/", views.LoginView.as_view(), name="knox_login"),
    path(r"auth/", include("knox.urls")),
    path("api-auth/", include("rest_framework.urls")),
]

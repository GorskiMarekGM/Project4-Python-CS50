
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("addPost", views.addPost, name="addPost"),
    path("postsList", views.postsList, name="postsList"),
    path("profile", views.profile, name="profile"),

    #API routes
    path("profile/<int:profile_id>", views.profile_json, name="profile_json"),


]

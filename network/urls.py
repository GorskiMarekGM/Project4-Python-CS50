
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("addPost", views.addPost, name="addPost"),
    #path("postsList", views.postsList, name="postsList"),
    path("profile", views.profile, name="profile"),

    #API routes
    path("profile/<int:profile_id>", views.profile_json, name="profile_json"),
    path("all_posts", views.all_posts, name="all_posts"),
    path("following_posts", views.following_posts, name="following_posts"),
    path("user_posts/<int:profile_id>", views.user_posts, name="user_posts"),
    path("get_user", views.get_user, name="get_user"),
    path("get_following/<int:profile_id>", views.get_following, name="get_following"),
    path("follow/<int:followed_profile>", views.follow, name="follow"),
    path("unfollow/<int:unfollowed_profile>", views.unfollow, name="unfollow"),
    path("is_follower/<int:is_user1>/<int:following_user2>", views.is_follower, name="is_follower"),


]

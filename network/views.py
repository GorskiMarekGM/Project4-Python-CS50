from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse
from django import forms
from datetime import datetime
import json
from django.core import serializers

from .models import User, Post

class PostForm(forms.Form):
    title = forms.CharField(label="title")
    postText = forms.Textarea()

def index(request):
    posts_list = Post.objects.all().order_by('-creation_date')

    return render(request, "network/index.html",{
        "posts_list" : posts_list,
    })

# JSON
@login_required
def profile_json(request,profile_id):
    following = User.objects.get(id = profile_id).following
    followers = User.objects.get(id = profile_id).followers
    username = User.objects.get(id = profile_id).username
    
    data = {
        "userName": username,
        "following": following,
        "followers": followers,
    }

    return JsonResponse(data)

def all_posts(request):

    # Return posts in reverse chronologial order
    posts = Post.objects.all().order_by("-creation_date").all()
    return JsonResponse([post.serialize() for post in posts], safe=False)

def user_posts(request, profile_id):
    author = User.objects.get(id = profile_id)

    # Return posts in reverse chronologial order
    posts = Post.objects.filter( author = author).order_by("-creation_date").all()
    return JsonResponse([post.serialize() for post in posts], safe=False)

def get_user(request):

    # Return users in reverse chronologial order
    user = User.objects.get(id = request.user.id)
    return JsonResponse(user.serialize(), safe=False)



# PROFILE
def profile(request):
    posts_list = Post.objects.filter(author=request.user).order_by('-creation_date')


    return render(request, "network/profile.html",{
        "posts_list" : posts_list,
        "user": request.user,
    })

# POSTS
def addPost(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data["title"]
            postText = form.data["postText"]
            date = datetime.now()

        else:
            message = "Invalid form... Try again."
            return render(request,"network/index.html",{
            })
            
        new_post = Post(title = title, text= postText,creation_date=date, likes = 0, author= request.user)
        new_post.save()

        return redirect('index')
        
    return redirect('index')

# def postsList(request):
#     posts_list = Post.objects.all().order_by('-creation_date')

#     return render(request, "network/posts.html",{
#         "posts_list" : posts_list,
#     })



# LOGING, AND SIGNING SECTION
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

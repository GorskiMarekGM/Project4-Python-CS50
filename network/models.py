from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    followers = models.IntegerField(blank=True, null=True)
    following = models.IntegerField(blank=True, null=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.username,
        }

    def __str__(self):
        return self.username


class Post(models.Model):
    title = models.CharField(max_length=64)
    text = models.TextField()
    likes = models.IntegerField()
    creation_date = models.DateTimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name="author")

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "text": self.text,
            "likes": self.likes,
            "creation_date": self.creation_date.strftime("%b %d %Y, %I:%M %p"),
            "author": self.author.username,
            "author_id": self.author.id,
        }

    def __str__(self):
            return f"ID:{self.id} Title:{self.title} Text:{self.text} Likes:{self.likes} Created:{self.creation_date} Author:{self.author}"



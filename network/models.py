from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    followers = models.IntegerField()
    following = models.IntegerField()


class Post(models.Model):
    title = models.CharField(max_length=64)
    text = models.TextField()
    likes = models.IntegerField()
    creation_date = models.DateTimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name="author")

    def __str__(self):
            return f"ID:{self.id} Title:{self.title} Text:{self.text} Likes:{self.likes} Created:{self.creation_date} Author:{self.author}"



from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    title = models.CharField(max_length=64)
    text = models.TextField()
    likes = models.IntegerField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name="author")

    def __str__(self):
            return f"{self.title} {self.text} {self.author}"



from django.contrib import admin

from .models import Post
# Register your models here.

class PostAdmin(admin.ModelAdmin):
    posts = ("id","title","likes","author")

admin.site.register(Post,PostAdmin)
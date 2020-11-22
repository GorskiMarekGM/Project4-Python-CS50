from django.contrib import admin

from .models import Post
# Register your models here.

class PostAdmin(admin.ModelAdmin):
    posts = ("id","title","text","likes","creation_date","author")

admin.site.register(Post,PostAdmin)
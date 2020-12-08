from django.contrib import admin

from .models import Post, User
# Register your models here.

class PostAdmin(admin.ModelAdmin):
    posts = ("id","title","text","likes","creation_date","author")

    
class UserAdmin(admin.ModelAdmin):
    posts = ("id","username")

admin.site.register(Post,PostAdmin),
admin.site.register(User,UserAdmin)

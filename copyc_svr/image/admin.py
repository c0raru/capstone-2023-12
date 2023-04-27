from django.contrib import admin
from . import models

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id','name']
    list_display_links = ['id', 'name']

@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'thumbnail', 'category', 'name', 'date']
    list_display_links = ['id', 'thumbnail', 'name']
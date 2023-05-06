from django.contrib import admin
from .models import Category, Contact

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    list_display_links = ['id', 'name']

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['id','title', 'is_answered', 'question_at', 'answered_at']
    list_display_links = ['id', 'title']
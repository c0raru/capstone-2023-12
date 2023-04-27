from django.contrib import admin
from .models import Notice

@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ['id','title', 'fixed', 'date']
    list_display_links = ['id', 'title']
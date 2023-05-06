from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.Terms)
class TermsAdmin(admin.ModelAdmin):
    list_display = ['id', 'url', 'name']
    list_display_links = ['id', 'url', 'name']
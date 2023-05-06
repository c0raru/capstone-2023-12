from django.contrib import admin
from . import models

class ProductImageInline(admin.TabularInline):
    model = models.ProductImage
    extra = 0

class SizeInline(admin.TabularInline):
    model = models.Size
    extra = 1

class ViewHistoryInline(admin.TabularInline):
    model = models.ViewHistory
    readonly_fields = ('user', 'product', 'date')
    extra = 0
    def has_add_permission(self, request, obj=None):
        return False
    def has_change_permission(self, request, obj=None):
        return False
    def has_delete_permission(self, request, obj=None):
        return False

class LikeInline(admin.TabularInline):
    model = models.Like
    readonly_fields = ('user', 'date')
    extra = 0
    def has_add_permission(self, request, obj=None):
        return False
    def has_change_permission(self, request, obj=None):
        return False
    # def has_delete_permission(self, request, obj=None):
    #     return False

@admin.register(models.Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['id','name']
    list_display_links = ['id', 'name']

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id','name']
    list_display_links = ['id', 'name']

@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'thumbnail', 'brand', 'category', 'name', 'date']
    list_display_links = ['id', 'thumbnail', 'name']
    inlines = (ProductImageInline, SizeInline, LikeInline, ViewHistoryInline, )
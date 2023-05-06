from . import settings
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Django CKEditor
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('api/user/', include('user.urls')),
    path('api/terms/', include('terms.urls')),
    path('api/product/', include('product.urls')),
    path('api/notice/', include('notice.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/style/', include('style.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
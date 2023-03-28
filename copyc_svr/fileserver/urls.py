from . import views
from django.urls import path, include, re_path

urlpatterns = [
    path('<code>', views.File.as_view()),
    path('<code>/', views.File.as_view()),
    path('', views.File.as_view()),
]
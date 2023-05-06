from . import views
from django.urls import path, include

urlpatterns = [
    path('', views.UserAPI.as_view()),
    path('password/', views.ChangePassword.as_view()),
    # path('reset/password/', views.LostPassword.as_view()),
]
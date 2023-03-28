from . import views
from django.urls import path, include

urlpatterns = [
    path('', views.UserAPI.as_view()),
    path('login/', views.SocialLogin.as_view()),
    path('connect/', views.SocialConnect.as_view()),
    path('artist/', views.Artist.as_view()),
    path('thumbnail/', views.ChangeThumbnail.as_view()),
    path('find/email/', views.FindEmail.as_view()),
    path('profile/', views.ChangeProfile.as_view()),
    path('nickname/', views.ChangeNickname.as_view()),
    path('password/', views.ChangePassword.as_view()),
    path('check/email/', views.CheckEmail.as_view()),
    path('auth/email/', views.SendAuth.as_view()),
    path('reset/password/', views.LostPassword.as_view()),
    path('<id>/', views.UserAPI.as_view()),
]
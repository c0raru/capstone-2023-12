from django.contrib.sessions import models
from django.http.response import JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework import authentication, permissions, serializers
from django.contrib.auth import authenticate, get_user_model, login, logout
from fileserver.models import File

import random
from user.serializers import UserSerializer, ArtistCreateValidate
from .models import EmailAuth, User, UserSession, Artist
import datetime
import re
import secrets
from django.contrib.auth import user_logged_in
from django.dispatch.dispatcher import receiver
from django.contrib.sessions.models import Session
import dateutil.parser

import smtplib
from email.mime.text import MIMEText

is_phone = re.compile('\d{3}\-?\d{3,4}\-?\d{4}')
is_email = re.compile(r'\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b')


class SocialConnect(APIView):
    def get(self, request):
        user = request.user
        provider = request.GET.get("provider", "")
        code = request.GET.get("code", "")


class UserAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, id=None):
        user = request.user
        if id and id != "undefined":
            try:
                user = User.objects.get(id=id)
            except User.DoesNotExist as e:
                return JsonResponse({
                    "user": ["존재하지 않는 사용자입니다."]
                }, status=400)
        elif not request.user.is_authenticated:
            return JsonResponse({
                "user": ["로그인이 필요합니다."]
            }, status=400)
        return JsonResponse(UserSerializer(user).data)

    def put(self, request, *args, **kwargs):
        email = request.data.get("email", None)
        password = request.data.get("password", None)
        nickname = request.data.get("nickname", None)
        fullname = request.data.get("fullname", None)
        gender = request.data.get("gender", None)
        birthday = request.data.get("birthday", None)
        code = request.data.get("code", None)

        birthday = dateutil.parser.parse(birthday)

        if not email:
            return JsonResponse({
                "user": ["이메일을 입력해주세요."]
            }, status=400)

        if not is_email.fullmatch(email):
            return JsonResponse({
                "user": ["이메일 형식이 맞지 않습니다."]
            }, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({
                "user": ["이미 존재하는 이메일입니다."]
            }, status=400)

        if not password:
            return JsonResponse({
                "user": ["비밀번호를 입력해주세요."]
            }, status=400)

        if not fullname:
            return JsonResponse({
                "user": ["실명을 입력해주세요."]
            }, status=400)

        if not birthday:
            return JsonResponse({
                "user": ["생년월일을 입력해주세요."]
            }, status=400)

        if gender not in ["M", "F"]:
            return JsonResponse({
                "user": ["올바른 성별을 입력해주세요."]
            }, status=400)

        try:
            ea = EmailAuth.objects.get(email=email, code=code)
            ea.delete()
        except EmailAuth.DoesNotExist:
            return JsonResponse({
                "email": ["이메일 인증번호가 올바르지 않습니다."]
            }, status=400)

        user = User()
        user.email = email
        user.fullname = fullname
        user.nickname = nickname
        user.youtube = youtube
        user.set_password(password)
        user.save()

        user = authenticate(request, email=email, password=password)
        login(request, user)

        return JsonResponse(**NORMAL)

    def post(self, request):
        email = request.data.get("email", "")
        password = request.data.get("password", "")

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse(**NORMAL)

        return JsonResponse(**WRONG_ACCOUNT)

    def delete(self, request):
        logout(request)
        return JsonResponse(**NORMAL)


class FindEmail(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        return JsonResponse(**NORMAL)
        # TODO 아이디 찾기 기능 필요


class CheckEmail(APIView):
    def post(self, request):
        email = request.data.get("email", "").strip()
        is_exists = get_user_model().objects.filter(email=email).exists()
        return JsonResponse({
            "is_exists": is_exists
        })


class ChangePassword(APIView):
    '''
    POST /user/password
    {
    "password": "현재비번",
    "password_new": "새로운 비번"
    }
    '''
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        password = request.data.get("password", "").strip()
        password_new = request.data.get("password_new", "")

        if len(password) == 0 or len(password_new) == 0:
            return JsonResponse({
                "login": ["비밀번호를 입력해주세요."]
            }, status=400)

        user = request.user

        if not user.check_password(password):
            return JsonResponse({
                "login": ["비밀번호가 올바르지 않습니다."]
            }, status=400)

        user.set_password(password_new)
        user.save()

        return JsonResponse({
            "login": ["완료"]
        }, status=200)
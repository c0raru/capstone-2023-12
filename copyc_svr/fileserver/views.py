import os
from django.contrib.auth.models import User
from django.http.response import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.http import FileResponse
from django.core.files.storage import FileSystemStorage
from .models import File as FileModel
from product.models import ProductImage as ProductImageModel
from django.views.static import serve
import secrets

class File(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        code = kwargs.get("code", None)
        try:
            file = FileModel.objects.get(code=code)
        except FileModel.DoesNotExist:
            return Response(data=None)
        file_path = file.attached.path
        print(os.path.basename(file_path), os.path.dirname(file_path))
        return serve(request, os.path.basename(file_path), os.path.dirname(file_path))

    def put(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({
                "user": ["로그인이 필요합니디."]
            }, status=400)
        code = secrets.token_hex(nbytes=16)
        attached = request.FILES.get("file", None)
        user = request.user if request.user.is_authenticated else None
        file = ProductImageModel(code=code, image=attached, uploader=user)
        file.save()
        return JsonResponse({
            "code": code
        })
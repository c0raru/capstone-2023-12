from django.http.response import JsonResponse
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from fileserver.serializers import FileSerializer
from . import models
from rest_framework import serializers
from django.core.validators import EmailValidator, ValidationError
import re
from rest_framework.validators import UniqueTogetherValidator
from datetime import datetime
from user.models import User as UserModel

is_phone = re.compile('\d{3}\-?\d{3,4}\-?\d{4}')
is_url = re.compile(r'[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?')

class UserSerializer(ModelSerializer):

    class Meta:
        model = models.User
        fields = "__all__"


class UserSimpleSerializer(ModelSerializer):
    thumbnail = SerializerMethodField()
    def get_thumbnail(self, user):
        return FileSerializer(user.thumbnail).data
    class Meta:
        model = models.User
        fields = ['id', "nickname",]
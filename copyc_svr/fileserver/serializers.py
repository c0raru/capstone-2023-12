from rest_framework.serializers import ModelSerializer, SerializerMethodField
from . import models

from django.core.validators import EmailValidator, ValidationError

class FileSerializer(ModelSerializer):
    class Meta:
        model = models.File
        fields = '__all__'
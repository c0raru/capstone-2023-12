from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField

class Terms(models.Model):
    url = models.CharField("주소 '/terms/<here>'", max_length=100)
    name = models.CharField("약관 명", max_length=100)
    contents = RichTextUploadingField(verbose_name="약관 내용")
    class Meta:
        verbose_name = '이용약관'
        verbose_name_plural = '이용약관'
    def __str__(self):
        return self.name
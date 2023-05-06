from tabnanny import verbose
from django.contrib.auth import get_user_model
from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models

class Category(models.Model):
    """
    문의 별 카테고리
    """
    name = models.CharField("카테고리 명", max_length=128)

    class Meta:
        verbose_name_plural = '문의유형 관리'

    def __str__(self):
        return self.name

class Contact(models.Model):
    """
    이 모델은 1:1 문의를 의미합니다.
    """
    user = models.ForeignKey(get_user_model(), verbose_name="질의자", on_delete=models.SET_NULL, null=True)
    title = models.CharField("질의 제목", max_length=128)
    category = models.ForeignKey(to=Category, verbose_name="문의유형", on_delete=models.SET_NULL, null=True)
    contents = RichTextUploadingField("질의 내용")
    answer = RichTextUploadingField("답변 내용", blank=True)
    is_answered = models.BooleanField("답변 여부", default=False, blank=True)
    question_at = models.DateTimeField("질의 등록일", auto_now_add=True)
    answered_at = models.DateTimeField("답변 등록일", null=True, default=None)

    class Meta:
        verbose_name_plural = '질의답변'

    def __str__(self):
        return self.title

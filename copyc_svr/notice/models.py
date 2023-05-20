from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models

class Notice(models.Model):
    """
    이 모델은 공지사항을 의미합니다.
    """
    title = models.CharField("공지사항 이름", max_length=128)
    contents = RichTextUploadingField("사진내용")
    fixed = models.BooleanField("상위 고정 여부", default=False)
    date = models.DateTimeField("등록일", auto_now_add=True)

    class Meta:
        verbose_name_plural = '공지사항'

    def __str__(self):
        return self.title

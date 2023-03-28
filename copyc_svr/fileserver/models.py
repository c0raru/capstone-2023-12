from django.db import models

class File(models.Model):
    PRODUCT_TYPES = (
        ("FEED", "피드"),
    )
    code = models.CharField("코드명", max_length=100, unique=True)
    attached = models.FileField("첨부 파일", upload_to="fileserver/")
    uploader = models.ForeignKey(to='user.User', on_delete=models.SET_NULL, null=True)
    purpose = models.CharField("용도", max_length=20, choices=PRODUCT_TYPES, default="", blank=True)
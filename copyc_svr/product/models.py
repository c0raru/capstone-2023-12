from django.db import models
from django.contrib.auth import get_user_model
from ckeditor_uploader.fields import RichTextUploadingField

class Brand(models.Model):
    name = models.CharField("카테고리 명", max_length=10)

    class Meta:
        verbose_name_plural = '브랜드'

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField("카테고리 명", max_length=10)
    english = models.CharField("영어이름", max_length=100, blank=True, null=True)

    class Meta:
        verbose_name_plural = '카테고리'

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(to=Category, verbose_name="카테고리", null=True, on_delete=models.SET_NULL)
    brand = models.ForeignKey(to=Brand, verbose_name="브랜드", null=True, on_delete=models.SET_NULL)
    name = models.CharField("사진명", max_length=100)
    thumbnail = models.FileField("사진 썸네일", upload_to='uploads/%Y%m%d/')
    contents = RichTextUploadingField("사진내용")
    price = models.IntegerField("금액(KRW)")
    date = models.DateTimeField("등록일", auto_now_add=True)

    class Meta:
        verbose_name_plural = '사진'
    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(to=Product, verbose_name="사진", on_delete=models.CASCADE, null=True)
    image = models.FileField("사진 세부이미지", upload_to='uploads/%Y%m%d/')
    code = models.CharField("코드명", max_length=100, unique=True)
    # attached = models.FileField("첨부 파일", upload_to="fileserver/")
    uploader = models.ForeignKey(to='user.User', on_delete=models.SET_NULL, null=True)

class Like(models.Model):
    user = models.ForeignKey(to=get_user_model(), verbose_name="사용자", on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, verbose_name="사진", on_delete=models.CASCADE)
    date = models.DateTimeField("좋아요 등록일", auto_now_add=True)
    class Meta:
        verbose_name_plural = '선호 사진'

class ViewHistory(models.Model):
    user = models.ForeignKey(to=get_user_model(), verbose_name="사용자", null=True, on_delete=models.SET_NULL)
    product = models.ForeignKey(to=Product, verbose_name="사진", null=True, on_delete=models.SET_NULL)
    date = models.DateTimeField("열람 일시", auto_now_add=True)

    class Meta:
        verbose_name_plural = '사진 열람 로그'

    def __str__(self):
        return self.name

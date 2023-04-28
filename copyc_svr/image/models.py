from django.db import models

class Category(models.Model):
    name = models.CharField("카테고리 명", max_length=10)
    english = models.CharField("영어이름", max_length=100, blank=True, null=True)

    class Meta:
        verbose_name_plural = '카테고리'

    def __str__(self):
        return self.name


class Image(models.Model):
    """
    이 모델은 상품을 의미합니다.
    FK로 카테고리를 선택할 수 있습니다.
    """
    category = models.ForeignKey(to=Category, verbose_name="카테고리", null=True, on_delete=models.SET_NULL)
    name = models.CharField("이름", max_length=100)
    thumbnail = models.FileField("썸네일", upload_to='uploads/%Y%m%d/')
    # contents = RichTextField("내용")
    date = models.DateTimeField("등록일", auto_now_add=True)

    class Meta:
        verbose_name_plural = '이미지'
    def __str__(self):
        return self.name

class ImageDetail(models.Model):
    product = models.ForeignKey(to=Image, verbose_name="이미지", on_delete=models.CASCADE)
    detail = models.FileField("세부 이미지", upload_to='uploads/%Y%m%d/')
class Like(models.Model):
    """
    이 모델은 사용자들이 하트를 눌러 찜한 이미지를 의미합니다.
    """
#    user = models.ForeignKey(to=get_user_model(), verbose_name="사용자", on_delete=models.CASCADE)
    image = models.ForeignKey(to=Image, verbose_name="이미지", on_delete=models.CASCADE)
    date = models.DateTimeField("좋아요 등록일", auto_now_add=True)

    class Meta:
        verbose_name_plural = '선호 상품'
    def __str__(self):
        return self.name

class ViewHistory(models.Model):
    """
    게시물 열람 로그입니다.
    """
#    user = models.ForeignKey(to=get_user_model(), verbose_name="사용자", null=True, on_delete=models.SET_NULL)
    image = models.ForeignKey(to=Image, verbose_name="이미지", null=True, on_delete=models.SET_NULL)
    date = models.DateTimeField("열람 일시", auto_now_add=True)

    class Meta:
        verbose_name_plural = '게시물 열람 로그'

    def __str__(self):
        return self.name
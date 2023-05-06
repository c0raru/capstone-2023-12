from django.db import models
from django.contrib.auth import get_user_model
from ckeditor_uploader.fields import RichTextUploadingField

class Brand(models.Model):
    """
    이 모델은 각 상품별 브랜드입니다.
    예시: 샤넬, 구찌, 에르메스 등
    """
    name = models.CharField("카테고리 명", max_length=10)

    class Meta:
        verbose_name_plural = '브랜드'

    def __str__(self):
        return self.name

class Category(models.Model):
    """
    이 모델은 각 상품별 카테고리를 의미합니다.
    추후에 styles 앱에서 어울리는 상품을 보여주는데 활용됩니다.
    예시: 상의, 하의, 바지, 슬랙스 등
    """
    name = models.CharField("카테고리 명", max_length=10)
    english = models.CharField("영어이름", max_length=100, blank=True, null=True)

    class Meta:
        verbose_name_plural = '카테고리'

    def __str__(self):
        return self.name

class Product(models.Model):
    """
    이 모델은 상품을 의미합니다.
    FK로 카테고리와 브랜드를 선택할 수 있습니다.
    """
    category = models.ForeignKey(to=Category, verbose_name="카테고리", null=True, on_delete=models.SET_NULL)
    brand = models.ForeignKey(to=Brand, verbose_name="브랜드", null=True, on_delete=models.SET_NULL)
    name = models.CharField("상품명", max_length=100)
    thumbnail = models.FileField("상품 썸네일", upload_to='uploads/%Y%m%d/')
    contents = RichTextUploadingField("상품내용")
    price = models.IntegerField("금액(KRW)")
    date = models.DateTimeField("등록일", auto_now_add=True)

    class Meta:
        verbose_name_plural = '상품'
    def __str__(self):
        return self.name

class ProductImage(models.Model):
    """
    이 모델은 상품의 세부 이미지들을 표현합니다.
    슬라이드에서 보여집니다.
    """
    product = models.ForeignKey(to=Product, verbose_name="상품", on_delete=models.CASCADE)
    image = models.FileField("상품 세부이미지", upload_to='uploads/%Y%m%d/')

class Like(models.Model):
    """
    이 모델은 사용자들이 하트를 눌러 저장된 선호 상품을 의미합니다.
    """
    user = models.ForeignKey(to=get_user_model(), verbose_name="사용자", on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, verbose_name="상품", on_delete=models.CASCADE)
    date = models.DateTimeField("좋아요 등록일", auto_now_add=True)

    class Meta:
        verbose_name_plural = '선호 상품'

class ViewHistory(models.Model):
    """
    상품 열람 로그입니다.
    """
    user = models.ForeignKey(to=get_user_model(), verbose_name="사용자", null=True, on_delete=models.SET_NULL)
    product = models.ForeignKey(to=Product, verbose_name="상품", null=True, on_delete=models.SET_NULL)
    date = models.DateTimeField("열람 일시", auto_now_add=True)

    class Meta:
        verbose_name_plural = '상품 열람 로그'

    def __str__(self):
        return self.name

class Size(models.Model):
    """
    사이즈
    """
    SIZES = [
        ("S", "S"),
        ("M", "M"),
        ("L", "L"),
        ("XL", "XL"),
        ("XXL", "XXL"),
        ("XXXL", "XXXL"),
    ]
    product = models.ForeignKey(to=Product, verbose_name="상품", null=True, on_delete=models.SET_NULL)
    size = models.CharField(verbose_name="크기", choices=SIZES, max_length=10)
    tall_row = models.IntegerField(verbose_name="키(최소)")
    tall_high = models.IntegerField(verbose_name="키(최대)")
    weight_row = models.IntegerField(verbose_name="몸무게(최소)")
    weight_high = models.IntegerField(verbose_name="몸무게(최대)")

    class Meta:
        verbose_name_plural = '사이즈'

    def __str__(self):
        return "[%s] 키: %d~%dcm, 몸무게: %d~%dkg"%(
            self.size,
            self.tall_row,
            self.tall_high,
            self.weight_row,
            self.weight_high
        )

class Cart(models.Model):
    """
    장바구니
    """
    option = models.ForeignKey(to=Size, verbose_name="상품 옵션(크기)", null=True, on_delete=models.SET_NULL)
    count = models.IntegerField(verbose_name="개수")
    user = models.ForeignKey(to=get_user_model(), verbose_name="사용자", null=True, on_delete=models.SET_NULL)

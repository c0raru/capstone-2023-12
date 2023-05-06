from django.db import models
from django.contrib.auth import get_user_model

from product.models import Category

class Request(models.Model):
    THIGH_CHOICES = [
        ["LEFT", "남는다"],
        ["FIT", "딱맞다"],
        ["LOOSE", "널널하다"],
    ]
    BODY_CHOICES = [
        ["A", "허벅지 평균 이상"],
        ["B", "종아리 평균 이상"],
        ["C", "마른체형"],
        ["D", "골격 체형"],
        ["E", "골반 발달"],
        ["F", "딱히 없다"],
    ]
    user = models.ForeignKey(to=get_user_model(), on_delete=models.SET_NULL, null=True, verbose_name="사용자")
    category = models.ForeignKey(to=Category, on_delete=models.SET_NULL, null=True, verbose_name="카테고리")
    tall = models.IntegerField("키(cm)")
    weight = models.IntegerField("몸무게(kg)")
    thigh = models.CharField("허벅지", max_length=10, choices=THIGH_CHOICES)
    foot = models.IntegerField("발 사이즈(mm)")
    underwear = models.IntegerField("속옷 크기")
    body = models.CharField("체형", max_length=10, choices=BODY_CHOICES)
    create_at = models.DateTimeField("생성날짜", auto_now_add=True)

    class Meta:
        verbose_name_plural = '스타일 추천 요청'
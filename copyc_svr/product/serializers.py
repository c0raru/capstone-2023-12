from dataclasses import field
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from product.models import Brand, Category, Product, ProductImage, Like, ViewHistory
from rest_framework.exceptions import ValidationError
import os

class BrandSerializer(ModelSerializer):

    class Meta:
        model = Brand
        fields = '__all__'


class CategorySerializer(ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(ModelSerializer):

    brand = BrandSerializer()
    category = CategorySerializer()
    thumbnail = SerializerMethodField()
    
    def get_thumbnail(self, obj):
        queryset = ProductImage.objects.filter(product=obj).first()
        return ProductImageSerializer(queryset).data.get("image", "")

    class Meta:
        model = Product
        fields = ("id", "name", "thumbnail", "price", "date", "category", "brand")

class ProductImageSerializer(ModelSerializer):
    filename = SerializerMethodField()
    
    def get_filename(self, obj):
        return os.path.basename(obj.image.name)
    
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'filename']

class ProductDetailSerializer(ModelSerializer):

    brand = BrandSerializer()
    category = CategorySerializer()
    images = SerializerMethodField()
        
    def get_images(self, obj):
        queryset = ProductImage.objects.filter(product=obj)
        return ProductImageSerializer(queryset, many=True).data
    
    class Meta:
        model = Product
        fields = ("id", "name", "price", "date", "category", "brand", "contents", "images")

class LikeListSerializer(ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = Like
        fields = ['product',]
        validators = []

class LikeSerializer(ModelSerializer):
    
    def validate(self, attrs):
        user = attrs.get("user", None)
        product = attrs.get("product", None)
        if Like.objects.filter(user=user, product=product).exists():
            raise ValidationError("이미 선호 스타일에 추가하셨습니다.")
        return attrs

    class Meta:
        model = Like
        fields = ['user', 'product']
        validators = []
    
class ViewHistorySerializer(ModelSerializer):

    thumbnail = SerializerMethodField()
    product = ProductSerializer()
    
    def get_thumbnail(self, obj):
        queryset = ProductImage.objects.filter(product=obj.product).first()
        return ProductImageSerializer(queryset).data.get("image", "")

    # def get_product(self, obj):
    #     return O
    #     return

    class Meta:
        model = ViewHistory
        fields = '__all__'




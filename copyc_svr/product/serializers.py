from dataclasses import field
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from product.models import Brand, Cart, Category, Product, ProductImage, Like, Size, ViewHistory
from rest_framework.exceptions import ValidationError

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
    
    # TODO: thumbnail 완료하기

    class Meta:
        model = Product
        fields = ("id", "name", "thumbnail", "price", "date", "category", "brand")

class ProductImageSerializer(ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class SizeSerializer(ModelSerializer):
    class Meta:
        model = Size
        fields = ["id", "size"]

class ProductDetailSerializer(ModelSerializer):

    brand = BrandSerializer()
    category = CategorySerializer()
    images = SerializerMethodField()
    size = SerializerMethodField()

    def get_images(self, obj):
        queryset = ProductImage.objects.filter(product=obj)
        return ProductImageSerializer(queryset, many=True).data
    
    def get_size(self, obj):
        queryset = Size.objects.filter(product=obj)
        return SizeSerializer(queryset, many=True).data
    
    class Meta:
        model = Product
        fields = ("id", "name", "thumbnail", "price", "date", "category", "brand", "contents", "images", "size")

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

    class Meta:
        model = ViewHistory
        fields = '__all__'

class CartSerializer(ModelSerializer):
    option = SizeSerializer()
    product = SerializerMethodField()

    def get_product(self, cart):
        return ProductSerializer(cart.option.product).data

    class Meta:
        model = Cart
        fields = '__all__'




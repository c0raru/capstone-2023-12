from rest_framework.serializers import ModelSerializer
from image.models import Category, Image, ImageDetail, Like, ViewHistory

class CategorySerializer(ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(ModelSerializer):

    class Meta:
        model = Image
        fields = '__all__'


class ImageDetailSerializer(ModelSerializer):

    class Meta:
        model = ImageDetail
        fields = '__all__'
class LikeSerializer(ModelSerializer):

    class Meta:
        model = Like
        fields = '__all__'


class ViewHistorySerializer(ModelSerializer):

    class Meta:
        model = ViewHistory
        fields = '__all__'
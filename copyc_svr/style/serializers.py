from rest_framework.serializers import ModelSerializer
from product.serializers import CategorySerializer, ProductDetailSerializer, ProductSerializer, SerializerMethodField
from style.models import Request
from product.models import Product

class RequestSerializer(ModelSerializer):

    class Meta:
        model = Request
        fields = '__all__'

class RequestListSerializer(ModelSerializer):
    category = CategorySerializer()
    thigh = SerializerMethodField()
    body = SerializerMethodField()
    items = SerializerMethodField()
    
    def get_thigh(self, obj):
        return dict(Request.THIGH_CHOICES).get(obj.thigh, "")

    def get_body(self, obj):
        return dict(Request.BODY_CHOICES).get(obj.body, "")
    
    def get_items(self, obj):
        return []

    class Meta:
        model = Request
        fields = '__all__'

class RequestDetailSerializer(RequestListSerializer):
    pass
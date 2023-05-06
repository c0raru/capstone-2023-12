from rest_framework.serializers import ModelSerializer
from product.serializers import CategorySerializer, ProductDetailSerializer, ProductSerializer, SerializerMethodField
from style.models import Request
from product.models import Product, Size

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
        items = Product.objects.filter()
        rows = Size.objects\
                    .filter(tall_high__gte=obj.tall, tall_row__lte=obj.tall)\
                    .filter(weight_high__gte=obj.weight, weight_row__gte=obj.weight)
        output = []
        for row in rows:
            output.append(ProductSerializer(row.product).data)
        return output

    class Meta:
        model = Request
        fields = '__all__'

class RequestDetailSerializer(RequestListSerializer):
    pass
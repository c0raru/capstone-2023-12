from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from product.serializers import BrandSerializer, CartSerializer, CategorySerializer, LikeListSerializer, ProductDetailSerializer, ProductSerializer, ProductImageSerializer, LikeSerializer, SizeSerializer, ViewHistorySerializer
from product.models import Brand, Cart, Category, Product, ProductImage, Like, Size, ViewHistory
from utils import StandardResultsSetPagination
from rest_framework.serializers import ValidationError
from django.db.models import Q

class BrandViewSet(ViewSet):

    def list(self, request):
        queryset = Brand.objects.order_by('pk')
        serializer = BrandSerializer(queryset, many=True)
        return Response(serializer.data)

class CategoryViewSet(ViewSet):

    def list(self, request):
        queryset = Category.objects.order_by('pk')
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

class ProductViewSet(ViewSet):

    def list(self, request):
        paginator = StandardResultsSetPagination()
        queryset = Product.objects.order_by('pk')
        query = request.GET.get("query")
        if query:
            queryset = queryset.filter(
                Q(category__name=query) | 
                Q(brand__name=query) | 
                Q(name__contains=query)
            )
        results = paginator.paginate_queryset(queryset, request)
        serializer = ProductSerializer(results, many=True)
        return paginator.get_paginated_response(serializer.data)

    def create(self, request):
        imageName = request.data.get("imageName", "")
        imageDescription = request.data.get("imageDescription", "")
        category = request.data.get("category", -1)
        attached = request.data.get("attached", [])
        category_obj = Category.objects.get(id=category)
        product = Product(category=category_obj, brand=None, name=imageName, contents=imageDescription, price=500*len(attached))
        product.save()
        
        for attach in attached:
            image = ProductImage.objects.get(code=attach)
            image.product = product
            image.save()

        return JsonResponse({"id": product.id}, safe=False)

    def retrieve(self, request, pk=None):
        queryset = Product.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = ProductDetailSerializer(item)
        return Response(serializer.data)

class LikeViewSet(ViewSet):

    def list(self, request):
        if not request.user.is_authenticated:
            return Response({
                "user": ["로그인이 필요합니디."]
            }, status=400)

        queryset = Like.objects.filter(user=request.user).order_by('pk')
        serializer = LikeListSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):

        product = request.data.get("product", None)

        if not request.user.is_authenticated:
            return Response({
                "user": ["로그인이 필요합니다."]
            }, status=400)

        if product == None or not Product.objects.filter(id=product).exists():
            return Response({
                "user": ["존재하지 않는 상품입니다."]
            }, status=400)

        data = {
            "user": request.user.id,
            "product": product
        }

        serializer = LikeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        """
        pk = product id
        """
        return Response({
            "is_like": Like.objects.filter(product=pk, user=request.user).exists() if request.user.is_authenticated else False
        })

    def destroy(self, request, pk=None):
        """
        pk = product id
        """
        try:
            item = Like.objects.get(user=request.user, product=pk)
        except Like.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)


class ViewHistoryViewSet(ViewSet):

    def create(self, request):
        serializer = ViewHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class CartViewSet(ViewSet):

    def create(self, request):
        if not request.user.is_authenticated:
            return Response({
                "user": ["로그인이 필요합니디."]
            }, status=400)

        count = request.data.get("count", 0)
        option = request.data.get("option", 0)

        if count == 0:
            return JsonResponse({
                "user": ["상품이 1개 이상이어야합니다."]
            }, status=400)

        if not Size.objects.filter(id=option).exists():
            return JsonResponse({
                "user": ["존재하지 않는 상품입니다."]
            }, status=400)

        size = Size.objects.get(id=option)

        cart = Cart(
            user=request.user,
            count=count,
            option=size
        )

        cart.save()
        return Response(CartSerializer(cart).data, status=201)

    def list(self, request):
        if not request.user.is_authenticated:
            return Response({
                "user": ["로그인이 필요합니디."]
            }, status=400)
        queryset = Cart.objects.filter(user=request.user).order_by('pk')
        serializer = CartSerializer(queryset, many=True)
        return Response(serializer.data)
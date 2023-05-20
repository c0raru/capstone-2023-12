from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from product.serializers import BrandSerializer, CategorySerializer, LikeListSerializer, ProductDetailSerializer, ProductSerializer, ProductImageSerializer, LikeSerializer, ViewHistorySerializer
from product.models import Brand, Category, Product, ProductImage, Like, ViewHistory
from user.models import User as UserModel
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
        if not request.user.is_authenticated:
            return Response({
                "user": ["로그인이 필요합니디."]
            }, status=400)
        imageName = request.data.get("imageName", "")
        imageDescription = request.data.get("imageDescription", "")
        category = request.data.get("category", -1)
        attached = request.data.get("attached", [])
        category_obj = Category.objects.get(id=category)
        user = UserModel.objects.get(id=request.user.id)
        user.coin = user.coin + 500*len(attached)
        user.save()
        product = Product(category=category_obj, brand=None, name=imageName, contents=imageDescription, price=500*len(attached))
        product.save()
        for attach in attached:
            image = ProductImage.objects.get(code=attach)
            image.product = product
            image.save()
        ViewHistory(user=request.user, product=product).save()
        return JsonResponse({"id": product.id}, safe=False)

    def retrieve(self, request, pk=None):
        if not request.user.is_authenticated:
            return Response({
                "user": ["로그인이 필요합니디."]
            }, status=400)
        queryset = Product.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = ProductDetailSerializer(item)
        if not ViewHistory.objects.filter(user=request.user, product=item).exists():
            user = UserModel.objects.get(id=request.user.id)
            if user.coin < item.price:
                return Response({
                    "user": ["코인이 부족합니다."]
                }, status=400)
            user.coin = user.coin - item.price
            user.save()            
            ViewHistory(user=request.user, product=item).save()
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
                "user": ["존재하지 않는 사진입니다."]
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
        return Response({
            "is_like": Like.objects.filter(product=pk, user=request.user).exists() if request.user.is_authenticated else False
        })

    def destroy(self, request, pk=None):
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

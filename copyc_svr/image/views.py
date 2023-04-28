from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from image.serializers import CategorySerializer, ImageSerializer, ImageDetailSerializer, LikeSerializer, ViewHistorySerializer
from image.models import Category, Image, ImageDetail, Like, ViewHistory

class CategoryViewSet(ViewSet):

    def list(self, request):
        queryset = Category.objects.order_by('pk')
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        queryset = Category.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = CategorySerializer(item)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            item = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response(status=404)
        serializer = CategorySerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            item = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)


class ProductViewSet(ViewSet):

    def list(self, request):
        queryset = Image.objects.order_by('pk')
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        queryset = Image.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = ProductSerializer(item)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            item = Image.objects.get(pk=pk)
        except Image.DoesNotExist:
            return Response(status=404)
        serializer = ProductSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            item = Image.objects.get(pk=pk)
        except Image.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)

    class ImageDetailViewSet(ViewSet):

        def list(self, request):
            queryset = ImageDetail.objects.order_by('pk')
            serializer = ImageDetailSerializer(queryset, many=True)
            return Response(serializer.data)

        def create(self, request):
            serializer = ImageDetailSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)

        def retrieve(self, request, pk=None):
            queryset = ImageDetail.objects.all()
            item = get_object_or_404(queryset, pk=pk)
            serializer = ImageDetailSerializer(item)
            return Response(serializer.data)

        def update(self, request, pk=None):
            try:
                item = ImageDetail.objects.get(pk=pk)
            except ImageDetail.DoesNotExist:
                return Response(status=404)
            serializer = ImageDetailSerializer(item, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)

        def destroy(self, request, pk=None):
            try:
                item = ImageDetail.objects.get(pk=pk)
            except ImageDetail.DoesNotExist:
                return Response(status=404)
            item.delete()
            return Response(status=204)


class LikeViewSet(ViewSet):

    def list(self, request):
        queryset = Like.objects.order_by('pk')
        serializer = LikeSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = LikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        queryset = Like.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = LikeSerializer(item)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            item = Like.objects.get(pk=pk)
        except Like.DoesNotExist:
            return Response(status=404)
        serializer = LikeSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            item = Like.objects.get(pk=pk)
        except Like.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)


class ViewHistoryViewSet(ViewSet):

    def list(self, request):
        queryset = ViewHistory.objects.order_by('pk')
        serializer = ViewHistorySerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ViewHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        queryset = ViewHistory.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = ViewHistorySerializer(item)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            item = ViewHistory.objects.get(pk=pk)
        except ViewHistory.DoesNotExist:
            return Response(status=404)
        serializer = ViewHistorySerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            item = ViewHistory.objects.get(pk=pk)
        except ViewHistory.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)


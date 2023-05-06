from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from style.serializers import RequestSerializer, RequestListSerializer, RequestDetailSerializer
from style.models import Request


class RequestViewSet(ViewSet):

    def list(self, request):
        if not request.user.is_authenticated:
            return Response({"contact": ["로그인이 필요합니다."]}, status=400)
        queryset = Request.objects.order_by('pk')
        queryset = queryset.filter(user=request.user)
        serializer = RequestListSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        if not request.user.is_authenticated:
            return Response({"contact": ["로그인이 필요합니다."]}, status=400)
        data = request.data
        data['user'] = request.user.id
        serializer = RequestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        if not request.user.is_authenticated:
            return Response({"contact": ["로그인이 필요합니다."]}, status=400)
        queryset = Request.objects.all()
        item = get_object_or_404(queryset, pk=pk, user=request.user)
        serializer = RequestDetailSerializer(item)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            item = Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            return Response(status=404)
        serializer = RequestSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            item = Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)

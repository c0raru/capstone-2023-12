from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from notice.serializers import NoticeSerializer
from notice.models import Notice

class NoticeViewSet(ViewSet):

    def list(self, request):
        queryset = Notice.objects.order_by('pk')
        serializer = NoticeSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = NoticeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        queryset = Notice.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = NoticeSerializer(item)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            item = Notice.objects.get(pk=pk)
        except Notice.DoesNotExist:
            return Response(status=404)
        serializer = NoticeSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            item = Notice.objects.get(pk=pk)
        except Notice.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)
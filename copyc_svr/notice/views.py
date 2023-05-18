from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from notice.serializers import NoticeDetailSerializer, NoticeSerializer
from notice.models import Notice


class NoticeViewSet(ViewSet):

    def list(self, request):
        is_fixed = request.GET.get("fixed", False)
        queryset = Notice.objects.order_by('-pk')
        if is_fixed:
            queryset = queryset.filter(fixed=True)
        else:
            queryset = queryset.filter(fixed=False)
        serializer = NoticeSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Notice.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = NoticeDetailSerializer(item)
        return Response(serializer.data)
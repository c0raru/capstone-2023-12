from rest_framework.serializers import ModelSerializer
from notice.models import Notice


class NoticeSerializer(ModelSerializer):

    class Meta:
        model = Notice
        fields = ['id', 'title', 'fixed', 'date']

class NoticeDetailSerializer(ModelSerializer):
    class Meta:
        model = Notice
        fields = ['id', 'title', 'contents', 'fixed', 'date']
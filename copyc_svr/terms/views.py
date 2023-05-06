from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from terms.serializers import TermsSerializer
from terms.models import Terms


class TermsViewSet(ViewSet):
    def retrieve(self, request, pk=None):
        queryset = Terms.objects.all()
        item = get_object_or_404(queryset, url=pk)
        serializer = TermsSerializer(item)
        return Response(serializer.data)

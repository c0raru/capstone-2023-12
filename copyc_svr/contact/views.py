from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from contact.serializers import CategorySerializer, ContactDetailSerializer, ContactListSerializer, ContactSerializer
from contact.models import Category, Contact


class CategoryViewSet(ViewSet):

    def list(self, request):
        queryset = Category.objects.order_by('pk')
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

class ContactViewSet(ViewSet):

    def list(self, request):
        if not request.user.is_authenticated:
            return Response({"contact": ["로그인이 필요합니다."]}, status=400)
        queryset = Contact.objects.filter(user=request.user)
        queryset.order_by('-pk')
        serializer = ContactListSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        if not request.user.is_authenticated:
            return Response({"contact": ["로그인이 필요합니다."]}, status=400)
        data = request.data
        serializer = ContactSerializer(data={
            "user": request.user.id,
            "title": data.get("title", ""),
            "category": data.get("category", ""),
            "contents": data.get("contents", ""),
            "answer": "",
            "is_answered": False
        })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        if not request.user.is_authenticated:
            return Response({"contact": ["로그인이 필요합니다."]}, status=400)
        queryset = Contact.objects.filter(id=pk, user=request.user)
        item = get_object_or_404(queryset)
        serializer = ContactDetailSerializer(item)
        return Response(serializer.data)

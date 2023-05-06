from rest_framework.serializers import ModelSerializer
from contact.models import Category, Contact


class CategorySerializer(ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class ContactSerializer(ModelSerializer):

    class Meta:
        model = Contact
        fields = '__all__'

class ContactDetailSerializer(ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Contact
        fields = '__all__'

class ContactListSerializer(ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Contact
        fields = ["id", "title", "category", "question_at", "is_answered"]
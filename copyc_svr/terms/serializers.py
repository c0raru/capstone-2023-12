from rest_framework.serializers import ModelSerializer
from terms.models import Terms


class TermsSerializer(ModelSerializer):

    class Meta:
        model = Terms
        fields = '__all__'

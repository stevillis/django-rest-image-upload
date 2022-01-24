from rest_framework import serializers

from api.models import Imagem


class ImagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagem
        fields = ("imagem",)

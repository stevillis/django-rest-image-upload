from rest_framework import viewsets

from api.models import Imagem
from api.serializers import ImagemSerializer


class ImagemViewSet(viewsets.ModelViewSet):
    queryset = Imagem.objects.all()
    serializer_class = ImagemSerializer

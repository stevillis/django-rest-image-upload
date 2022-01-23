from django.http import JsonResponse
from rest_framework import viewsets

from api.models import Imagem
from api.serializers import ImagemSerializer


class ImagemViewSet(viewsets.ModelViewSet):
    queryset = Imagem.objects.all()
    serializer_class = ImagemSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        data = {
            "foto": serializer.data.get("foto", ""),
            "descricao": serializer.data.get("descricao", ""),
        }
        return JsonResponse(data)

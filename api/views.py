import cv2
from django.http import JsonResponse
from rest_framework import viewsets

from api.models import Imagem
from api.serializers import ImagemSerializer


def find_cats_on_image(foto):
    # load the input image and convert it to grayscale
    image = cv2.imread(foto)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # load the cat detector Haar cascade, then detect cat faces
    # in the input image
    detector = cv2.CascadeClassifier('haarcascade_frontalcatface.xml')
    rects = detector.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=10, minSize=(75, 75))

    # loop over the cat faces and draw a rectangle surrounding each
    for (i, (x, y, w, h)) in enumerate(rects):
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)
        cv2.putText(image, "Gato {}".format(i + 1), (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (0, 0, 255, 2))

    return image


class ImagemViewSet(viewsets.ModelViewSet):
    queryset = Imagem.objects.all()
    serializer_class = ImagemSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        foto = serializer.data.get("foto", "")
        foto_analisada = find_cats_on_image(foto)

        data = {
            "foto": foto_analisada,
            "descricao": serializer.data.get("descricao", ""),
        }
        return JsonResponse(data)

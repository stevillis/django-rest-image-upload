import cv2
import numpy as np
import requests
from django.conf import settings
from django.http import JsonResponse
from rest_framework import viewsets

from api.models import Imagem
from api.serializers import ImagemSerializer


def find_file_name(image_url):
    return image_url.split("/")[-1]


def find_cats_on_image(image_url):
    file_name = find_file_name(image_url)

    # download image from url
    resp = requests.get(image_url, stream=True).raw
    imagem = np.asarray(bytearray(resp.read()), dtype="uint8")

    # load the input image and convert it to grayscale
    # image = cv2.imread(imagem)
    image = cv2.imdecode(imagem, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # load the cat detector Haar cascade, then detect cat faces
    # in the input image
    detector = cv2.CascadeClassifier(
        f"{str(settings.BASE_DIR)}/api/haarcascade_frontalcatface2.xml"
    )
    rects = detector.detectMultiScale(
        gray, scaleFactor=1.3, minNeighbors=10, minSize=(75, 75)
    )

    # loop over the cat faces and draw a rectangle surrounding each
    for (i, (x, y, w, h)) in enumerate(rects):
        cv2.rectangle(image, (x, y), (x + w, y + h), (125, 239, 56), 2)
        cv2.putText(
            image,
            "Gato {}".format(i + 1),
            (x, y - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (125, 239, 56),
            2,
        )

    # overwite the original image with cat detections
    cv2.imwrite(f"{str(settings.BASE_DIR)}/media/{file_name}", image)

    return len(rects)


class ImagemViewSet(viewsets.ModelViewSet):
    queryset = Imagem.objects.all()
    serializer_class = ImagemSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        imagem = serializer.data.get("imagem", "")
        quantidade_gatos = find_cats_on_image(imagem)

        data = {
            "imagem": imagem,
            "descricao": serializer.data.get("descricao", ""),
            "quantidade_gatos": quantidade_gatos,
        }
        return JsonResponse(data)

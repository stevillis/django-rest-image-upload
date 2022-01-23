from django.db import models


class Imagem(models.Model):
    imagem = models.ImageField()
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.imagem.url)

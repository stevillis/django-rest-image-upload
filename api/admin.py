from django.contrib import admin

from api.models import Imagem


@admin.register(Imagem)
class ImagemAdmin(admin.ModelAdmin):
    list_display = ("id", "imagem", "data")
    list_display_links = ("id",)

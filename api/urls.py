from django.urls import path

from api.views import ImagemViewSet

urlpatterns = [
    path("images/", ImagemViewSet.as_view(), name="images"),
]

from rest_framework.routers import DefaultRouter
from ..peticiones.views import PeticionViewSet
from django.urls import include, path


router = DefaultRouter()
router.register(r"", PeticionViewSet, "peticiones")

urlpatterns = [
    path("", include(router.urls)),
]

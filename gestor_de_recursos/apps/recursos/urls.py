# apps/recursos/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecursoViewSet

router = DefaultRouter()
# Antes tenías: router.register(r'api/v1', RecursoViewSet, 'recursos')
# Cámbialo a r'' (cadena vacía) para que los endpoints queden en la raíz de este include:
router.register(r"", RecursoViewSet, basename="recursos")

urlpatterns = [
    path("", include(router.urls)),
]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet


router = DefaultRouter()
router.register(r'api/v1', UsuarioViewSet , 'usuarios')


urlpatterns = [
    path('', include(router.urls)),
    ]
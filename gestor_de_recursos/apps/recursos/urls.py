from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.recursos.views import RecursoViewSet


router = DefaultRouter()
router.register(r'api/v1', RecursoViewSet , 'recursos')


urlpatterns = [
    path('', include(router.urls)),
    ] 
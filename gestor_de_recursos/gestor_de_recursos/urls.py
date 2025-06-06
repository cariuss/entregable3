# gestor_de_recursos/gestor_de_recursos/urls.py

from django.contrib import admin
from django.urls import include, path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Importa tu LoginView directamente desde apps.usuarios.views
from apps.usuarios.views import LoginView

schema_view = get_schema_view(
    openapi.Info(
        title="API Gestor de Recursos",
        default_version="v1",
        contact=openapi.Contact(email="guillentcarlos@gmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    # Endpoints REST de cada app
    path("recursos/api/v1/", include("apps.recursos.urls")),
    path("peticiones/api/v1/", include("apps.peticiones.urls")),
    path("usuarios/api/v1/", include("apps.usuarios.urls")),
    # En lugar de include('apps.usuarios.urls_login'), llamamos directamente a LoginView
    # para que /login/api/ ejecute tu LoginView (p. ej. para JWT o autenticación)
    path("login/api/", LoginView.as_view(), name="login-api"),
    # Documentación Swagger / Redoc
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    # Rutas de tu frontend basado en Django Templates
    path("", include("frontend.urls", namespace="frontend")),
]

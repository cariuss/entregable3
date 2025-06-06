# frontend/urls.py

from django.urls import path
from . import views

app_name = "frontend"

urlpatterns = [
    # Página principal: redirige a lista de recursos
    path("", views.home, name="home"),
    # ——— Recursos ———
    path("recursos/", views.recursos_list, name="recursos_list"),
    path("recursos/nuevo/", views.recursos_form, name="recursos_create"),
    path("recursos/editar/<int:pk>/", views.recursos_form, name="recursos_edit"),
    # ——— Peticiones ———
    path("peticiones/", views.peticiones_list, name="peticiones_list"),
    path("peticiones/nuevo/", views.peticiones_form, name="peticiones_create"),
    path("peticiones/editar/<int:pk>/", views.peticiones_form, name="peticiones_edit"),
    # ——— Usuarios ———
    path("usuarios/", views.usuarios_list, name="usuarios_list"),
    path("usuarios/nuevo/", views.usuarios_form, name="usuarios_create"),
    path("usuarios/editar/<int:pk>/", views.usuarios_form, name="usuarios_edit"),
    # ——— Login ———
    path("login/", views.login_view, name="login"),
]

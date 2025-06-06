# frontend/views.py

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages


def home(request):
    # Redirige al listado de Recursos
    return redirect("frontend:recursos_list")


### ---- Recursos ----


def recursos_list(request):
    """
    Renderiza la plantilla que listará todos los recursos.
    El JS 'recursos.js' hará fetch a /recursos/api/v1/ para poblar la tabla.
    """
    return render(request, "frontend/recursos_list.html")


def recursos_form(request, pk=None):
    """
    Si pk es None → crear un nuevo recurso
    Si pk tiene valor → editar recurso existente
    El JS 'recursos_form.js' se encargará de GET/POST/PUT a /recursos/api/v1/{id}/
    """
    context = {"pk": pk}
    return render(request, "frontend/recursos_form.html", context)


### ---- Peticiones ----


def peticiones_list(request):
    return render(request, "frontend/peticiones_list.html")


def peticiones_form(request, pk=None):
    context = {"pk": pk}
    return render(request, "frontend/peticiones_form.html", context)


### ---- Usuarios ----


def usuarios_list(request):
    return render(request, "frontend/usuarios_list.html")


def usuarios_form(request, pk=None):
    context = {"pk": pk}
    return render(request, "frontend/usuarios_form.html", context)


### ---- Login ----


def login_view(request):
    """
    Muestra un formulario de Django para autenticarse.
    (Podrías reemplazarlo por un HTML puro que luego use fetch al endpoint /login/api/,
    pero aquí mantenemos un login tradicional de Django.)
    """
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("frontend:recursos_list")
        else:
            messages.error(request, "Credenciales inválidas")
    return render(request, "frontend/login.html")

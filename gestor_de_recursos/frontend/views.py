# frontend/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages

# Para este ejemplo asumimos que quieres hacer login con formularios de Django,
# pero también podrías usar fetch() contra tu endpoint de login JWT.


def home(request):
    # Podrías redirigir directamente a recursos_list o mostrar un dashboard.
    return redirect("frontend:recursos_list")


### ---- Recursos ----


def recursos_list(request):
    """
    Renderiza la plantilla que lista todos los recursos.
    El JavaScript hará un fetch a /recursos/api/v1/ para obtener datos y mostrarlos.
    """
    return render(request, "frontend/recursos_list.html")


def recursos_form(request, pk=None):
    """
    Si pk es None → crear un nuevo recurso
    Si pk tiene valor → editar recurso existente
    El formulario HTML se encarga de capturar datos, y el JS hará POST/PUT a /recursos/api/v1/{id}/
    """
    context = {"pk": pk}  # La plantilla puede usar esto para saber si es create o edit
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
    Muestra una página con un formulario de Django (o un simple HTML) para autenticarse.
    Al enviar el form, puedes hacer login() tradicional o llamar al endpoint JWT y guardar el token en localStorage.
    Para este ejemplo sencillo usaremos el login tradicional de Django.
    """
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # redirige a lista de recursos (por ejemplo) luego del login
            return redirect("frontend:recursos_list")
        else:
            messages.error(request, "Credenciales inválidas")
    return render(request, "frontend/login.html")

# gestor_de_recursos/apps/usuarios/views_templates.py

from django.shortcuts import render


def usuarios_list_view(request):
    """
    Renderiza la lista de usuarios.
    """
    return render(request, "frontend/usuarios_list.html")


def usuario_form_view(request, pk=None):
    """
    Renderiza el formulario de creación/edición de usuario.
    La plantilla recibirá 'pk' para saber si está editando o creando.
    """
    contexto = {"pk": "" if pk is None else pk}
    return render(request, "frontend/usuarios_form.html", contexto)

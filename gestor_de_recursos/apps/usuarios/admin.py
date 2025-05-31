from django.contrib import admin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "correo", "numero", "direccion", "rol")
    search_fields = ("nombre", "correo", "numero")
    list_filter = ("rol",)

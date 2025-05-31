from django.contrib import admin
from .models import  SolicitudRecurso
from apps.recursos.models import Recurso

# Register your models here.
@admin.register(SolicitudRecurso)
class SolicitudRecursoAdmin(admin.ModelAdmin):
    list_display = ("usuario", "recurso", "cantidad_solicitada", "fecha_solicitud", "estado")
    list_filter = ("estado", "fecha_solicitud")
    search_fields = ("usuario__username", "recurso__nombre")
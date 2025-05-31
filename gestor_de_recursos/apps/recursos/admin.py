from django.contrib import admin
from .models import Recurso

@admin.register(Recurso)
class RecursoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "tipo", "cantidad_total", "cantidad_disponible", "fecha_creacion")
    search_fields = ("nombre", "tipo")
    list_filter = ("tipo", "fecha_creacion")

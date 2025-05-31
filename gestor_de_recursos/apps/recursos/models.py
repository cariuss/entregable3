from django.db import models

class Recurso(models.Model):
    id = models.CharField(primary_key=True, max_length=50, verbose_name="ID del Recurso")
    nombre = models.CharField(max_length=255, verbose_name="Nombre del Recurso")
    descripcion = models.TextField(blank=True, null=True, verbose_name="Descripción")
    tipo = models.CharField(max_length=100, verbose_name="Tipo de Recurso")
    cantidad_total = models.IntegerField(default=0, verbose_name="Cantidad Total")
    cantidad_disponible = models.IntegerField(default=0, verbose_name="Cantidad Disponible")
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    fecha_actualizacion = models.DateTimeField(auto_now=True, verbose_name="Fecha de Actualización")

    def __str__(self):
        return self.nombre

from rest_framework import serializers
from apps.recursos.models import Recurso
class RecursoSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Recurso
        fields = '__all__'  # Serializa todos los campos del modelos

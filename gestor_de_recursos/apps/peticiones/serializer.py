from rest_framework import serializers
from apps.recursos.models import Recurso
from apps.peticiones.models import SolicitudRecurso

class PeticionSerializer(serializers.ModelSerializer):
    recurso = serializers.SlugRelatedField(
        queryset=Recurso.objects.all(),
        slug_field='id'
    )

    class Meta:
        model = SolicitudRecurso
        fields = '__all__'
        extra_kwargs = {'usuario': {'required': False}}

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['usuario'] = request.user
        print("Datos validados para crear:", validated_data)
        return super().create(validated_data)
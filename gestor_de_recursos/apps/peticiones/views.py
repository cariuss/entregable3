from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from apps.peticiones.models import SolicitudRecurso
from apps.peticiones.serializer import PeticionSerializer

class PeticionViewSet(viewsets.ModelViewSet):
    queryset = SolicitudRecurso.objects.all()
    serializer_class = PeticionSerializer
    permission_classes = [IsAuthenticated]

   
    def perform_create(self, serializer):
        user = self.request.user
        print("Usuario actual:", user, user.is_authenticated, user.pk)

        recurso = serializer.validated_data.get('recurso')
        print("Recurso recibido:", recurso)

        if recurso is None:
            raise ValidationError("Recurso no válido o no encontrado.")

        serializer.save(usuario=user)

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
User = get_user_model()

from .serializer import UsuarioSerializer

Usuario = get_user_model()

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]  # Podés cambiar a IsAuthenticated si no querés permitir crear desde frontend público

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        correo = request.data.get('correo')
        password = request.data.get('password')

        try:
            user = Usuario.objects.get(correo=correo)
            if user.check_password(password):  # Verifica hash
                refresh = RefreshToken.for_user(user)
                return Response({
                    "access": str(refresh.access_token),
                    "usuario": {
                        "id": user.id,
                        "nombre": user.nombre,
                        "correo": user.correo,
                        "rol": user.rol,
                    }
                })
            else:
                return Response({"detail": "Credenciales incorrectas"}, status=status.HTTP_400_BAD_REQUEST)
        except Usuario.DoesNotExist:
            return Response({"detail": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

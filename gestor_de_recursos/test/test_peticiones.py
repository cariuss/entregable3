import pytest
from django.utils import timezone
from datetime import timedelta
from apps.recursos.models import Recurso
from apps.peticiones.models import SolicitudRecurso
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

@pytest.mark.django_db(transaction=True)
def test_crear_solicitud_recurso():
    # Generar correo único para evitar colisiones en pruebas repetidas
    correo_unico = f'test_{uuid.uuid4()}@example.com'

    # Eliminar usuario si ya existe (limpieza defensiva)
    User.objects.filter(correo=correo_unico).delete()

    # Crear usuario usando el UserManager personalizado o recuperarlo si ya existe
    user, created = User.objects.get_or_create(
        correo=correo_unico,
        defaults={
            'nombre': 'Test Usuario',
            'password': 'testpass123'
        }
    )
    if created:
        user.set_password('testpass123')
        user.save()

    # Crear un recurso
    recurso = Recurso.objects.create(
        nombre='Proyector HD',
        descripcion='Proyector de alta definición para presentaciones',
        cantidad_disponible=10
    )

    # Crear una solicitud de recurso
    solicitud = SolicitudRecurso.objects.create(
        usuario=user,
        recurso=recurso,
        cantidad_solicitada=2,
        fecha_entrega_esperada=timezone.now().date() + timedelta(days=1)
    )

    # Verificar datos básicos
    assert solicitud.usuario == user
    assert solicitud.recurso == recurso
    assert solicitud.cantidad_solicitada == 2
    assert solicitud.estado == 'pendiente'
    assert solicitud.fecha_entrega_esperada > timezone.now().date()


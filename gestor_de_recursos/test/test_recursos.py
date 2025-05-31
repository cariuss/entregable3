import pytest
from django.utils import timezone

from apps.recursos.models import Recurso

@pytest.mark.django_db
def test_crear_recurso():
    recurso = Recurso.objects.create(
        id="R001",
        nombre="Proyector",
        descripcion="Proyector HD para presentaciones",
        tipo="Electrónico",
        cantidad_total=5,
        cantidad_disponible=3,
    )
    assert recurso.id == "R001"
    assert recurso.nombre == "Proyector"
    assert recurso.descripcion == "Proyector HD para presentaciones"
    assert recurso.tipo == "Electrónico"
    assert recurso.cantidad_total == 5
    assert recurso.cantidad_disponible == 3
    assert recurso.fecha_creacion is not None
    assert recurso.fecha_actualizacion is not None

@pytest.mark.django_db
def test_str_method():
    recurso = Recurso.objects.create(
        id="R002",
        nombre="Laptop",
        descripcion="Laptop para uso general",
        tipo="Electrónico",
        cantidad_total=10,
        cantidad_disponible=8,
    )
    assert str(recurso) == "Laptop"

@pytest.mark.django_db
def test_blank_and_null_descripcion():
    recurso = Recurso.objects.create(
        id="R003",
        nombre="Silla",
        descripcion=None,
        tipo="Mobiliario",
        cantidad_total=20,
        cantidad_disponible=15,
    )
    assert recurso.descripcion is None

@pytest.mark.django_db
def test_fecha_actualizacion_changes_on_save():
    recurso = Recurso.objects.create(
        id="R004",
        nombre="Mesa",
        descripcion="Mesa de reuniones",
        tipo="Mobiliario",
        cantidad_total=2,
        cantidad_disponible=2,
    )
    old_fecha_actualizacion = recurso.fecha_actualizacion
    recurso.nombre = "Mesa grande"
    recurso.save()
    recurso.refresh_from_db()
    assert recurso.fecha_actualizacion > old_fecha_actualizacion
    
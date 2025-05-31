import pytest
from apps.usuarios.models import Usuario

@pytest.mark.django_db
def test_usuario_creacion():
    usuario = Usuario.objects.create_user(
        correo="testuser@example.com",
        nombre="Test User",
        contraseña="securepassword123"
    )
    assert usuario.correo == "testuser@example.com"
    assert usuario.nombre == "Test User"
    assert usuario.check_password("securepassword123")
    assert usuario.is_active is True
    assert usuario.is_staff is False

@pytest.mark.django_db
def test_usuario_sin_correo():
    with pytest.raises(ValueError, match="El correo electrónico es obligatorio"):
        Usuario.objects.create_user(
            correo=None,
            nombre="Test User",
            contraseña="securepassword123"
        )

@pytest.mark.django_db
def test_creacion_superusuario():
    superusuario = Usuario.objects.create_superuser(
        correo="admin@example.com",
        nombre="Admin User",
        contraseña="adminpassword123"
    )
    assert superusuario.correo == "admin@example.com"
    assert superusuario.nombre == "Admin User"
    assert superusuario.check_password("adminpassword123")
    assert superusuario.is_staff is True
    assert superusuario.is_superuser is True

@pytest.mark.django_db
def test_usuario_rol_por_defecto():
    usuario = Usuario.objects.create_user(
        correo="defaultrole@example.com",
        nombre="Default Role User",
        contraseña="password123"
    )
    assert usuario.rol == "usuario_estandar"

@pytest.mark.django_db
def test_usuario_rol_personalizado():
    usuario = Usuario.objects.create_user(
        correo="customrole@example.com",
        nombre="Custom Role User",
        contraseña="password123",
        rol="supervisor"
    )
    assert usuario.rol == "supervisor"
    

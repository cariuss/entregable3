# apps/usuarios/models.py
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class UsuarioManager(BaseUserManager):
    def create_user(self, correo, nombre, contraseña=None, **extra_fields):
        if not correo:
            raise ValueError('El correo electrónico es obligatorio')
        correo = self.normalize_email(correo)
        user = self.model(correo=correo, nombre=nombre, **extra_fields)
        user.set_password(contraseña)
        user.save(using=self._db)
        return user

    def create_superuser(self, correo, nombre, contraseña=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(correo, nombre, contraseña, **extra_fields)


class Usuario(AbstractBaseUser, PermissionsMixin):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=255)
    correo = models.EmailField(unique=True, max_length=100)
    numero = models.CharField(max_length=20)
    direccion = models.CharField(max_length=200)
    ROL_CHOICES = [
        ('administrador', 'Administrador'),
        ('usuario_estandar', 'Usuario Estándar'),
        ('supervisor', 'Supervisor'),
    ]
    rol = models.CharField(max_length=50, choices=ROL_CHOICES, default='usuario_estandar')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = ['nombre']

    def __str__(self):
        return self.nombre

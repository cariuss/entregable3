# apps/usuarios/serializer.py
from rest_framework import serializers
from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"
        # Aquí decimos que password NO sea obligatorio en update
        extra_kwargs = {
            "password": {
                "write_only": True,
                "required": False,  # <-- clave: no exigirlo
                "allow_null": True,  # <-- permitir null/omitir
            }
        }

    def create(self, validated_data):
        # Al crear, sí exigimos password (porque la contraseña debe venir siempre)
        password = validated_data.pop("password")
        user = Usuario(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        # Si el payload incluye password, lo reasignamos; si no, lo dejamos intacto.
        password = validated_data.pop("password", None)

        # Sobrescribimos todos los demás campos normalmente
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance

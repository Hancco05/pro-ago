from rest_framework import serializers
from .models import Empleado, AvisoRRHH

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = ['id', 'nombre', 'apellido', 'email', 'departamento', 'fecha_contratacion', 'dias_vacaciones']

class AvisoRRHHSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvisoRRHH
        fields = ['id', 'titulo', 'contenido', 'fecha_publicacion', 'importante']
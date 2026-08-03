from rest_framework import serializers
from .models import Empleado, AvisoRRHH

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'

class AvisoRRHHSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvisoRRHH
        fields = '__all__'
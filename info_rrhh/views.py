from django.shortcuts import render

from rest_framework import viewsets
from .models import Empleado, AvisoRRHH
from .serializers import EmpleadoSerializer, AvisoRRHHSerializer

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class AvisoRRHHViewSet(viewsets.ModelViewSet):
    queryset = AvisoRRHH.objects.all()
    serializer_class = AvisoRRHHSerializer
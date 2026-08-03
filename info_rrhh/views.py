from django.shortcuts import render

from rest_framework import viewsets
from .models import Empleado, AvisoRRHH
from .serializers import EmpleadoSerializer, AvisoRRHHSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import enviar_notificacion
from .models import Empleado

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class AvisoRRHHViewSet(viewsets.ModelViewSet):
    queryset = AvisoRRHH.objects.all()
    serializer_class = AvisoRRHHSerializer

@api_view(['POST'])
def enviar_correo_empleado(request):
    """
    Endpoint para enviar un correo a un empleado.
    Espera JSON: {"email": "empleado@mail.com", "asunto": "Hola", "mensaje": "Cuerpo del correo"}
    """
    email = request.data.get('email')
    asunto = request.data.get('asunto')
    mensaje = request.data.get('mensaje')

    if not email or not asunto or not mensaje:
        return Response({"error": "Faltan campos obligatorios"}, status=400)

    # Verificar que el email existe en la base de datos (opcional)
    try:
        empleado = Empleado.objects.get(email=email)
    except Empleado.DoesNotExist:
        return Response({"error": "Empleado no encontrado con ese email"}, status=404)

    # Enviar el correo
    exito = enviar_notificacion(email, asunto, mensaje)
    if exito:
        return Response({"mensaje": f"Correo enviado a {email}"}, status=200)
    else:
        return Response({"error": "Error al enviar el correo"}, status=500)
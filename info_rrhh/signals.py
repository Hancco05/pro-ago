from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import AvisoRRHH, Empleado
from .utils import enviar_correo

@receiver(post_save, sender=AvisoRRHH)
def enviar_aviso_por_correo(sender, instance, created, **kwargs):
    """
    Cuando se crea un nuevo aviso, envía un correo a todos los empleados.
    """
    if created:
        empleados = Empleado.objects.all()
        for empleado in empleados:
            asunto = f"Nuevo aviso de RRHH: {instance.titulo}"
            mensaje = f"Hola {empleado.nombre},\n\n{instance.contenido}"
            enviar_correo(empleado.email, asunto, mensaje)
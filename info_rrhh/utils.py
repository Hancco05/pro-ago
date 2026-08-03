from django.core.mail import send_mail
from django.conf import settings

def enviar_notificacion(destinatario, asunto, mensaje):
    """
    Envía un correo a un destinatario.
    - destinatario: email del empleado (str)
    - asunto: asunto del correo (str)
    - mensaje: contenido del correo (str)
    """
    try:
        send_mail(
            subject=asunto,
            message=mensaje,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[destinatario],
            fail_silently=False,  # Si falla, lanza una excepción
        )
        return True
    except Exception as e:
        print(f"Error al enviar correo: {e}")
        return False
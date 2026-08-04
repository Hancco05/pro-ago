from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from gestion_tareas.models import Tarea
from info_rrhh.utils import enviar_correo

class Command(BaseCommand):
    help = 'Envía recordatorios de tareas pendientes a los usuarios'

    def handle(self, *args, **options):
        usuarios = User.objects.all()
        for usuario in usuarios:
            tareas_pendientes = Tarea.objects.filter(usuario=usuario, completada=False)
            if tareas_pendientes.exists():
                mensaje = "Tienes las siguientes tareas pendientes:\n\n"
                for tarea in tareas_pendientes:
                    mensaje += f"- {tarea.titulo} (límite: {tarea.fecha_limite})\n"
                enviar_correo(usuario.email, "Recordatorio de tareas pendientes", mensaje)
        self.stdout.write(self.style.SUCCESS('Recordatorios enviados correctamente'))
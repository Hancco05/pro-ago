from django.db import models

from django.contrib.auth.models import User

class Tarea(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    creada = models.DateTimeField(auto_now_add=True)
    fecha_limite = models.DateField(blank=True, null=True)
    completada = models.BooleanField(default=False)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tareas')

    def __str__(self):
        return self.titulo
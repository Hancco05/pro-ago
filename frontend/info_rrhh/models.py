from django.db import models

class Empleado(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    departamento = models.CharField(max_length=100)
    fecha_contratacion = models.DateField()
    dias_vacaciones = models.IntegerField(default=20)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class AvisoRRHH(models.Model):
    titulo = models.CharField(max_length=200)
    contenido = models.TextField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    importante = models.BooleanField(default=False)

    def __str__(self):
        return self.titulo
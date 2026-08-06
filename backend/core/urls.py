from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tareas/', include('gestion_tareas.urls')),   # <-- Cambiamos
    path('api/rrhh/', include('info_rrhh.urls')),          # <-- Nueva ruta
]
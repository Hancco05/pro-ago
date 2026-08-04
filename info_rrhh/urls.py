from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmpleadoViewSet, AvisoRRHHViewSet, enviar_correo_empleado, enviar_correo_endpoint

router = DefaultRouter()
router.register(r'empleados', EmpleadoViewSet)
router.register(r'avisos', AvisoRRHHViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('enviar-correo/', enviar_correo_empleado, name='enviar_correo_empleado'),  # <-- Nueva ruta
    path('enviar-correo/', enviar_correo_endpoint, name='enviar_correo'),  # <-- Nueva ruta
]
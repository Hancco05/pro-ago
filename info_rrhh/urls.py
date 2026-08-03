from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmpleadoViewSet, AvisoRRHHViewSet

router = DefaultRouter()
router.register(r'empleados', EmpleadoViewSet)
router.register(r'avisos', AvisoRRHHViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
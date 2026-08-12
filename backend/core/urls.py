from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.shortcuts import redirect
from django.http import JsonResponse
from .views import api_root

def home(request):
    return JsonResponse({"mensaje": "API de RRHH funcionando correctamente"})

urlpatterns = [
    path('api/', api_root),  # <-- Agregar esta línea
    path('', home),  # <-- Al entrar a la raíz, muestra el JSON
    path('', lambda request: redirect('admin/')),  # Redirige a /admin/
    path('admin/', admin.site.urls),
    path('api/tareas/', include('gestion_tareas.urls')),   # <-- Cambiamos
    path('api/rrhh/', include('info_rrhh.urls')),          # <-- Nueva ruta
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
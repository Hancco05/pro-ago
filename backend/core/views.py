from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "mensaje": "API de RRHH funcionando",
        "endpoints": {
            "tareas": "/api/tareas/tareas/",
            "empleados": "/api/rrhh/empleados/",
            "avisos": "/api/rrhh/avisos/",
            "login": "/api/token/",
            "refresh": "/api/token/refresh/"
        }
    })
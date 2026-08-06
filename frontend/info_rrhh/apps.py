from django.apps import AppConfig

class InfoRrhhConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'info_rrhh'

    def ready(self):
        import info_rrhh.signals  # <-- Importar las señales
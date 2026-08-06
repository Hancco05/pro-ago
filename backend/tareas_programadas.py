import schedule
import time
import subprocess
import os
import django

# Configurar Django para usar los modelos y comandos
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def enviar_recordatorios():
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Enviando recordatorios...")
    try:
        # Ejecutar el comando personalizado
        subprocess.run(
            ['python', 'manage.py', 'recordatorio_tareas'],
            check=True,
            capture_output=True,
            text=True
        )
        print("✅ Recordatorios enviados correctamente.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error al ejecutar el comando: {e.stderr}")

# Programar la tarea para las 9:00 AM todos los días
schedule.every().day.at("09:00").do(enviar_recordatorios)

print("🔄 Sistema de recordatorios iniciado. Esperando horario...")
print("📅 Los recordatorios se enviarán automáticamente a las 9:00 AM.")

# Bucle infinito para mantener el script en ejecución
while True:
    schedule.run_pending()
    time.sleep(60)  # Revisa cada minuto si hay tareas pendientes
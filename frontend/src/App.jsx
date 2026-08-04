import React, { useEffect, useState } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('tareas/tareas/')
      .then(response => {
        setTareas(response.data);
        setCargando(false);
        console.log('✅ Datos recibidos:', response.data);
      })
      .catch(error => {
        console.error('❌ Error al conectar:', error);
        setError('No se pudo conectar con el backend. Asegúrate de que Django esté corriendo.');
        setCargando(false);
      });
  }, []);

  if (cargando) return <div>Cargando tareas...</div>;
  if (error) return <div style={{ color: 'red' }}>❌ {error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📋 Mis Tareas</h1>
      {tareas.length === 0 ? (
        <p>No hay tareas. Crea una desde el panel de administración de Django.</p>
      ) : (
        <ul>
          {tareas.map(tarea => (
            <li key={tarea.id} style={{ marginBottom: '10px' }}>
              <strong>{tarea.titulo}</strong>
              <br />
              <small>{tarea.descripcion || 'Sin descripción'}</small>
              <br />
              <span>{tarea.completada ? '✅ Completada' : '⏳ Pendiente'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
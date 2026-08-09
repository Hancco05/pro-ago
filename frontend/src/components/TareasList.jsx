import React, { useState, useEffect } from 'react';
import { getTareas, deleteTarea, updateTarea } from '../services/tareaService';
import TareaForm from './TareaForm';

const TareasList = () => {
  const [tareas, setTareas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const cargarTareas = async () => {
    setCargando(true);
    try {
      const res = await getTareas();
      setTareas(res.data);
      setError('');
    } catch (err) {
      setError('Error al cargar tareas');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta tarea?')) {
      try {
        await deleteTarea(id);
        setTareas(tareas.filter(t => t.id !== id));
      } catch {
        alert('Error al eliminar');
      }
    }
  };

  const handleToggleComplete = async (id, completada) => {
    try {
      const res = await updateTarea(id, { completada: !completada });
      setTareas(tareas.map(t => t.id === id ? res.data : t));
    } catch {
      alert('Error al actualizar estado');
    }
  };

  const handleEdit = (tarea) => {
    setEditando(tarea);
  };

  const handleCancelEdit = () => {
    setEditando(null);
  };

  const handleSaveEdit = async (data) => {
    try {
      const res = await updateTarea(editando.id, data);
      setTareas(tareas.map(t => t.id === editando.id ? res.data : t));
      setEditando(null);
    } catch {
      alert('Error al actualizar tarea');
    }
  };

  if (cargando) return <p>Cargando tareas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>📋 Lista de Tareas</h2>
      
      {/* Formulario para crear nueva tarea */}
      <TareaForm onSave={async (data) => {
        try {
          const res = await createTarea(data);
          setTareas([res.data, ...tareas]);
        } catch {
          alert('Error al crear tarea');
        }
      }} />

      {/* Lista de tareas */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tareas.map(tarea => (
          <li key={tarea.id} style={{
            border: '1px solid #ddd',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '5px',
            background: tarea.completada ? '#f0f8f0' : 'white'
          }}>
            {editando && editando.id === tarea.id ? (
              // Modo edición
              <TareaForm
                initialData={editando}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                isEditing
              />
            ) : (
              // Modo visualización
              <>
                <div>
                  <strong>{tarea.titulo}</strong>
                  {tarea.completada && <span style={{ marginLeft: '10px', color: 'green' }}>✅ Completada</span>}
                </div>
                <div><small>{tarea.descripcion || 'Sin descripción'}</small></div>
                <div><small>Fecha límite: {tarea.fecha_limite || 'Sin fecha'}</small></div>
                <div style={{ marginTop: '8px' }}>
                  <button onClick={() => handleToggleComplete(tarea.id, tarea.completada)}>
                    {tarea.completada ? 'Marcar pendiente' : 'Completar'}
                  </button>
                  <button onClick={() => handleEdit(tarea)} style={{ marginLeft: '8px' }}>Editar</button>
                  <button onClick={() => handleDelete(tarea.id)} style={{ marginLeft: '8px', color: 'red' }}>Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TareasList;
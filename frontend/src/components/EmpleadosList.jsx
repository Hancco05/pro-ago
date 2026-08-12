import React, { useState, useEffect } from 'react';
import { getEmpleados, deleteEmpleado, updateEmpleado } from '../services/empleadoService';
import EmpleadoForm from './EmpleadoForm';

const EmpleadosList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const cargarEmpleados = async () => {
    setCargando(true);
    try {
      const res = await getEmpleados();
      setEmpleados(res.data);
      setError('');
    } catch (err) {
      setError('Error al cargar empleados');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este empleado?')) {
      try {
        await deleteEmpleado(id);
        setEmpleados(empleados.filter(e => e.id !== id));
      } catch {
        alert('Error al eliminar');
      }
    }
  };

  const handleEdit = (empleado) => {
    setEditando(empleado);
  };

  const handleCancelEdit = () => {
    setEditando(null);
  };

  const handleSaveEdit = async (data) => {
    try {
      const res = await updateEmpleado(editando.id, data);
      setEmpleados(empleados.map(e => e.id === editando.id ? res.data : e));
      setEditando(null);
    } catch {
      alert('Error al actualizar empleado');
    }
  };

  if (cargando) return <p>Cargando empleados...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>👥 Lista de Empleados</h2>
      
      {/* Formulario para crear nuevo empleado */}
      <EmpleadoForm onSave={async (data) => {
        try {
          const res = await createEmpleado(data);
          setEmpleados([res.data, ...empleados]);
        } catch {
          alert('Error al crear empleado');
        }
      }} />

      {/* Lista de empleados */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {empleados.map(empleado => (
          <li key={empleado.id} style={{
            border: '1px solid #ddd',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '5px'
          }}>
            {editando && editando.id === empleado.id ? (
              <EmpleadoForm
                initialData={editando}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                isEditing
              />
            ) : (
              <>
                <div>
                  <strong>{empleado.nombre} {empleado.apellido}</strong>
                </div>
                <div>📧 {empleado.email}</div>
                <div>🏢 {empleado.departamento || 'Sin departamento'}</div>
                <div>📅 Contratado: {empleado.fecha_contratacion || 'No especificada'}</div>
                <div>🏝️ Vacaciones: {empleado.dias_vacaciones} días</div>
                <div style={{ marginTop: '8px' }}>
                  <button onClick={() => handleEdit(empleado)}>Editar</button>
                  <button onClick={() => handleDelete(empleado.id)} style={{ marginLeft: '8px', color: 'red' }}>Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmpleadosList;
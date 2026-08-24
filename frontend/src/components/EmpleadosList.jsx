import React, { useState, useEffect } from 'react';
import { getEmpleados, createEmpleado, updateEmpleado, deleteEmpleado } from '../services/empleadoService';
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
    } catch {
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

  const handleEdit = (empleado) => setEditando(empleado);
  const handleCancelEdit = () => setEditando(null);

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

      {/* Tabla de empleados */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Departamento</th>
            <th>Vacaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(emp => (
            <tr key={emp.id} style={{ borderBottom: '1px solid #ddd' }}>
              {editando && editando.id === emp.id ? (
                <td colSpan="6" style={{ padding: '10px' }}>
                  <EmpleadoForm
                    initialData={editando}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                    isEditing
                  />
                </td>
              ) : (
                <>
                  <td>{emp.nombre}</td>
                  <td>{emp.apellido}</td>
                  <td>{emp.email}</td>
                  <td>{emp.departamento || '-'}</td>
                  <td>{emp.dias_vacaciones}</td>
                  <td>
                    <button onClick={() => handleEdit(emp)}>Editar</button>
                    <button onClick={() => handleDelete(emp.id)} style={{ marginLeft: '8px', color: 'red' }}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {empleados.length === 0 && <p>No hay empleados registrados.</p>}
    </div>
  );
};

export default EmpleadosList;
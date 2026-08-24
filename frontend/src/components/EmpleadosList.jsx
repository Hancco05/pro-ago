import React, { useState, useEffect } from 'react';
import { getEmpleados, createEmpleado, updateEmpleado, deleteEmpleado } from '../services/empleadoService';
import EmpleadoForm from './EmpleadoForm';

const EmpleadosList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Cargar empleados al montar el componente
  const cargarEmpleados = async () => {
    setCargando(true);
    try {
      const res = await getEmpleados();
      setEmpleados(res.data);
      setError('');
    } catch (err) {
      console.error('Error al cargar:', err);
      setError('Error al cargar empleados');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  // Eliminar empleado
  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este empleado?')) {
      try {
        await deleteEmpleado(id);
        // Actualizar la lista local
        setEmpleados(empleados.filter(e => e.id !== id));
        alert('✅ Empleado eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('❌ Error al eliminar el empleado');
      }
    }
  };

  // Editar empleado
  const handleEdit = (empleado) => {
    setEditando(empleado);
  };

  const handleCancelEdit = () => {
    setEditando(null);
  };

  // Guardar edición
  const handleSaveEdit = async (data) => {
    try {
      const res = await updateEmpleado(editando.id, data);
      setEmpleados(empleados.map(e => e.id === editando.id ? res.data : e));
      setEditando(null);
      alert('✅ Empleado actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('❌ Error al actualizar el empleado');
    }
  };

  // Crear nuevo empleado
  const handleCreate = async (data) => {
    try {
      const res = await createEmpleado(data);
      setEmpleados([res.data, ...empleados]);
      alert('✅ Empleado creado correctamente');
    } catch (error) {
      console.error('Error al crear:', error);
      alert('❌ Error al crear el empleado. Revisa la consola.');
    }
  };

  if (cargando) return <p>Cargando empleados...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>👥 Lista de Empleados</h2>

      {/* Formulario para crear nuevo empleado */}
      <EmpleadoForm onSave={handleCreate} />

      {/* Lista de empleados en tabla */}
      {empleados.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
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
                  // Modo edición
                  <td colSpan="6" style={{ padding: '10px' }}>
                    <EmpleadoForm
                      initialData={editando}
                      onSave={handleSaveEdit}
                      onCancel={handleCancelEdit}
                      isEditing
                    />
                  </td>
                ) : (
                  // Modo visualización
                  <>
                    <td>{emp.nombre}</td>
                    <td>{emp.apellido}</td>
                    <td>{emp.email}</td>
                    <td>{emp.departamento || '-'}</td>
                    <td>{emp.dias_vacaciones}</td>
                    <td>
                      <button onClick={() => handleEdit(emp)}>✏️ Editar</button>
                      <button onClick={() => handleDelete(emp.id)} style={{ marginLeft: '8px', color: 'red' }}>
                        🗑️ Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmpleadosList;
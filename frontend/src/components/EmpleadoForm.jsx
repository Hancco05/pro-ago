import React, { useState, useEffect } from 'react';

const EmpleadoForm = ({ initialData, onSave, onCancel, isEditing = false }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    departamento: '',
    fecha_contratacion: '',
    dias_vacaciones: 20,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || '',
        apellido: initialData.apellido || '',
        email: initialData.email || '',
        departamento: initialData.departamento || '',
        fecha_contratacion: initialData.fecha_contratacion || '',
        dias_vacaciones: initialData.dias_vacaciones || 20,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!form.nombre.trim() || !form.apellido.trim() || !form.email.trim()) {
      alert('Nombre, apellido y email son obligatorios');
      return;
    }
    onSave(form);
    if (!isEditing) {
      setForm({
        nombre: '',
        apellido: '',
        email: '',
        departamento: '',
        fecha_contratacion: '',
        dias_vacaciones: 20,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ display: 'grid', gap: '10px' }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="text"
          name="departamento"
          placeholder="Departamento"
          value={form.departamento}
          onChange={handleChange}
          style={{ padding: '8px' }}
        />
        <input
          type="date"
          name="fecha_contratacion"
          value={form.fecha_contratacion}
          onChange={handleChange}
          style={{ padding: '8px' }}
        />
        <input
          type="number"
          name="dias_vacaciones"
          placeholder="Días de vacaciones"
          value={form.dias_vacaciones}
          onChange={handleChange}
          style={{ padding: '8px' }}
        />
        <div>
          <button type="submit">{isEditing ? 'Actualizar' : 'Crear empleado'}</button>
          {isEditing && (
            <button type="button" onClick={onCancel} style={{ marginLeft: '8px' }}>Cancelar</button>
          )}
        </div>
      </div>
    </form>
  );
};

export default EmpleadoForm;
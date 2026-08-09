import React, { useState, useEffect } from 'react';

const TareaForm = ({ initialData, onSave, onCancel, isEditing = false }) => {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    fecha_limite: '',
    completada: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        titulo: initialData.titulo || '',
        descripcion: initialData.descripcion || '',
        fecha_limite: initialData.fecha_limite || '',
        completada: initialData.completada || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!form.titulo.trim()) {
      alert('El título es obligatorio');
      return;
    }
    onSave(form);
    if (!isEditing) {
      // Limpiar formulario después de crear
      setForm({ titulo: '', descripcion: '', fecha_limite: '', completada: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ display: 'grid', gap: '10px' }}>
        <input
          type="text"
          name="titulo"
          placeholder="Título de la tarea"
          value={form.titulo}
          onChange={handleChange}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción (opcional)"
          value={form.descripcion}
          onChange={handleChange}
          style={{ padding: '8px' }}
        />
        <input
          type="date"
          name="fecha_limite"
          value={form.fecha_limite}
          onChange={handleChange}
          style={{ padding: '8px' }}
        />
        {isEditing && (
          <label>
            <input
              type="checkbox"
              name="completada"
              checked={form.completada}
              onChange={handleChange}
            />
            Completada
          </label>
        )}
        <div>
          <button type="submit">{isEditing ? 'Actualizar' : 'Crear tarea'}</button>
          {isEditing && (
            <button type="button" onClick={onCancel} style={{ marginLeft: '8px' }}>Cancelar</button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TareaForm;
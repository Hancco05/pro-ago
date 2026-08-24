import api from './api';

// Obtener todos los empleados
export const getEmpleados = () => api.get('rrhh/empleados/');

// Crear un nuevo empleado
export const createEmpleado = (data) => api.post('rrhh/empleados/', data);

// Actualizar un empleado existente
export const updateEmpleado = (id, data) => api.put(`rrhh/empleados/${id}/`, data);

// Eliminar un empleado
export const deleteEmpleado = (id) => api.delete(`rrhh/empleados/${id}/`);
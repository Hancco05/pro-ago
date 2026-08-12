import api from './api';

export const getEmpleados = () => api.get('rrhh/empleados/');
export const createEmpleado = (data) => api.post('rrhh/empleados/', data);
export const updateEmpleado = (id, data) => api.put(`rrhh/empleados/${id}/`, data);
export const deleteEmpleado = (id) => api.delete(`rrhh/empleados/${id}/`);
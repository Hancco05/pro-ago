import api from './api';

export const getTareas = () => api.get('tareas/tareas/');
export const createTarea = (data) => api.post('tareas/tareas/', data);
export const updateTarea = (id, data) => api.put(`tareas/tareas/${id}/`, data);
export const deleteTarea = (id) => api.delete(`tareas/tareas/${id}/`);
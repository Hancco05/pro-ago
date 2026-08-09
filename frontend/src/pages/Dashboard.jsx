import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import TareasList from '../components/TareasList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tareas, setTareas] = useState([]);
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    // Cargar tareas
    api.get('tareas/tareas/')
      .then(res => setTareas(res.data))
      .catch(err => console.error(err));

    // Cargar avisos de RRHH
    api.get('rrhh/avisos/')
      .then(res => setAvisos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>📊 Dashboard</h1>
        <div>
          <span>👋 {user?.username || 'Usuario'}</span>
          <button onClick={logout} style={{ marginLeft: '10px', padding: '5px 10px' }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* Tareas Pendientes */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
          <h2>📋 Tareas Pendientes</h2>
          {tareas.filter(t => !t.completada).length === 0 ? (
            <p>✅ Todas las tareas completadas</p>
          ) : (
            <ul>
              {tareas.filter(t => !t.completada).slice(0, 5).map(t => (
                <li key={t.id}>{t.titulo}</li>
              ))}
            </ul>
          )}
          <p><strong>Total pendientes:</strong> {tareas.filter(t => !t.completada).length}</p>
        </div>

        {/* Avisos RRHH */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
          <h2>📢 Avisos RRHH</h2>
          {avisos.length === 0 ? (
            <p>No hay avisos</p>
          ) : (
            <ul>
              {avisos.slice(0, 5).map(a => (
                <li key={a.id}>
                  <strong>{a.titulo}</strong>
                  {a.importante && <span style={{ color: 'red', marginLeft: '5px' }}>❗</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
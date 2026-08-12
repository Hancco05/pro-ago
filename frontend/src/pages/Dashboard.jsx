import React from 'react';
import { useAuth } from '../context/AuthContext';
import TareasList from '../components/TareasList';
import EmpleadosList from '../components/EmpleadosList';

const Dashboard = () => {
  const { user, logout } = useAuth();

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
        <div>
          <TareasList />
        </div>
        <div>
          <EmpleadosList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
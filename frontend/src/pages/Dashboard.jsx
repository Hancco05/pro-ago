import React from 'react';
import { useAuth } from '../context/AuthContext';
import EmpleadosList from '../components/EmpleadosList.jsx';
import TareasList from '../components/TareasList.jsx';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Panel de RRHH</h1>
      </header>
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Gestión de Empleados</h2>
            <EmpleadosList />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Gestión de Tareas</h2>
            <TareasList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
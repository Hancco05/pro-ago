import React from 'react';
import { useAuth } from '../context/AuthContext';
import EmpleadosList from '../components/EmpleadosList';
import TareasList from '../components/TareasList';

const Dashboard = () => {
  // Obtenemos el usuario y la función de logout del contexto
  const { user, logout } = useAuth();

  // Función para manejar el cierre de sesión (si tu contexto no tiene logout, borra esta función)
  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      alert("Función logout no implementada en AuthContext");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header del Dashboard */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de RRHH</h1>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm">
              Bienvenido, <strong>{user?.email || "Usuario"}</strong>
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container mx-auto p-6">
        
        {/* Tarjetas de Resumen (Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Total Empleados</h3>
            <p className="text-3xl font-bold text-gray-800">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Tareas Pendientes</h3>
            <p className="text-3xl font-bold text-gray-800">34</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Ausencias Hoy</h3>
            <p className="text-3xl font-bold text-gray-800">3</p>
          </div>
        </div>

        {/* Grid de los Componentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Sección de Empleados */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Gestión de Empleados</h2>
            <EmpleadosList />
          </div>

          {/* Sección de Tareas */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Gestión de Tareas</h2>
            <TareasList />
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
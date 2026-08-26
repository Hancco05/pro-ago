import { useAuth } from '../components/AuthContext';
import EmpleadosList from '../context/EmpleadosList';
import TareasList from '../context/TareasList';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Panel de RRHH</h1>
        <div className="flex items-center gap-4">
          <span>{user?.email}</span>
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Empleados</h2>
          <EmpleadosList />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Tareas</h2>
          <TareasList />
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
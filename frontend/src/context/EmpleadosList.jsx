import { useState } from 'react';

const EmpleadosList = () => {
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: 'María González', cargo: 'Marketing' },
    { id: 2, nombre: 'Carlos Pérez', cargo: 'Finanzas' },
    { id: 3, nombre: 'Lucía Fernández', cargo: 'IT' },
  ]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoCargo, setNuevoCargo] = useState('');

  const agregarEmpleado = (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim() || !nuevoCargo.trim()) return;
    
    const nuevoEmpleado = {
      id: Date.now(),
      nombre: nuevoNombre,
      cargo: nuevoCargo,
    };
    setEmpleados([...empleados, nuevoEmpleado]);
    setNuevoNombre('');
    setNuevoCargo('');
  };

  return (
    <div>
      <ul className="space-y-2 mb-4">
        {empleados.map((empleado) => (
          <li key={empleado.id} className="bg-gray-50 p-3 rounded flex justify-between">
            <span>{empleado.nombre}</span>
            <span className="text-gray-500 text-sm">{empleado.cargo}</span>
          </li>
        ))}
      </ul>
      
      {/* Formulario para agregar empleados */}
      <form onSubmit={agregarEmpleado} className="border-t pt-4 space-y-2">
        <input 
          type="text" 
          placeholder="Nombre del empleado" 
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input 
          type="text" 
          placeholder="Cargo" 
          value={nuevoCargo}
          onChange={(e) => setNuevoCargo(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600">
          Agregar Empleado
        </button>
      </form>
    </div>
  );
};

export default EmpleadosList;
import { useState } from 'react';

const TareasList = () => {
  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Revisar nómina de agosto', completada: false },
    { id: 2, texto: 'Agendar entrevistas', completada: false },
  ]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim()) return;

    const nueva = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false,
    };
    setTareas([...tareas, nueva]);
    setNuevaTarea('');
  };

  const toggleTarea = (id) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    ));
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  return (
    <div>
      <ul className="space-y-2 mb-4">
        {tareas.map((tarea) => (
          <li key={tarea.id} className="bg-gray-50 p-3 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={tarea.completada}
                onChange={() => toggleTarea(tarea.id)}
                className="w-4 h-4"
              />
              <span className={tarea.completada ? 'line-through text-gray-400' : ''}>
                {tarea.texto}
              </span>
            </div>
            <button 
              onClick={() => eliminarTarea(tarea.id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Formulario para agregar tareas */}
      <form onSubmit={agregarTarea} className="border-t pt-4 space-y-2">
        <input 
          type="text" 
          placeholder="Nueva tarea..." 
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
          Agregar Tarea
        </button>
      </form>
    </div>
  );
};

export default TareasList;
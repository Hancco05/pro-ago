const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
        <input type="text" placeholder="Usuario" className="border p-2 mb-2 w-full" />
        <input type="password" placeholder="Contraseña" className="border p-2 mb-4 w-full" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Entrar</button>
      </div>
    </div>
  );
};

export default Login;
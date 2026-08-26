import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Simulamos un usuario logueado. Luego lo cambiarás por tu API real.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (email) => {
    setLoading(true);
    setTimeout(() => {
      setUser({ email });
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
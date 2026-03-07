import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('clinic_token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await authAPI.verify();

        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem('clinic_token');
        localStorage.removeItem('clinic_user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    const res = await authAPI.login({ username, password });
    const { token, user } = res.data;
    localStorage.setItem('clinic_token', token);
    localStorage.setItem('clinic_user', JSON.stringify(user));
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('clinic_token');
    localStorage.removeItem('clinic_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

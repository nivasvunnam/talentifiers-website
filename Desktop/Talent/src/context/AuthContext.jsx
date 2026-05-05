import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const name = localStorage.getItem('name');
    if (token && userType && name) return { token, userType, name };
    return null;
  });

  const login = (token, userType, name) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType);
    localStorage.setItem('name', name);
    setUser({ token, userType, name });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('name');
    setUser(null);
  };

  const isAuthenticated = () => !!user?.token;

  const isOwner = () => user?.userType === 'owner';
  const isUser = () => user?.userType === 'user';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isOwner, isUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

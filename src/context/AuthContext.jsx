import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    id: null,
    email: null,
    roles: [],
  });

  useEffect(() => {
    const storedAuthState = JSON.parse(localStorage.getItem('authState'));
    if (storedAuthState) {
      setAuthState(storedAuthState);
    }
  }, []);

  // Función para guardar el estado de autenticación en localStorage
  const saveAuthState = (authData) => {
    localStorage.setItem('authState', JSON.stringify(authData));
  };

  // Función para hacer login
  const login = (userData) => {
    setAuthState(userData);
    saveAuthState(userData);
  };

  // Función para hacer logout
  const logout = () => {
    setAuthState({
      token: null,
      id: null,
      email: null,
      roles: [],
    });
    localStorage.removeItem('authState');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

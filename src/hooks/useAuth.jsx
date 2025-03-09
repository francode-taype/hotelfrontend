import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { login, logout } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Función para manejar el login
  const loginHandler = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = await loginUser(email, password);
      login(userData); // Guardamos los datos de autenticación en el contexto y en localStorage
      navigate('/admin/perfil');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar el logout
  const logoutHandler = () => {
    logout(); // Limpiamos el estado de autenticación y eliminamos los datos de localStorage
    navigate('/');
  };

  return {
    loginHandler,
    logoutHandler,
    isLoading,
    error,
  };
};

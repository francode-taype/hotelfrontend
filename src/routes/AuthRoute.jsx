import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import AuthPage from '../pages/Auth/AuthPage';

const AuthRoute = () => {
  const { authState } = useAuthContext();

  // Si ya estás logueado, redirige a la página de inicio
  if (authState.token) {
    return <Navigate to="/admin/perfil" />;
  }

  // Si no estás logueado, muestra la página de login
  return <AuthPage />;
};

export default AuthRoute;

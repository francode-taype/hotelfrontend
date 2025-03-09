import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authState } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authState.token !== null) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [authState]);

  // Mientras estamos cargando, no redirigimos
  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!authState.token) {
    return <Navigate to="/" replace />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;

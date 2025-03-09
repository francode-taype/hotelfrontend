import axios from 'axios';
import { apiUrl } from './apiUrl';

const httpClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token automáticamente en las cabeceras
httpClient.interceptors.request.use(
  (config) => {
    try {
      const authState = JSON.parse(localStorage.getItem('authState'));
      const token = authState?.token;

      if (token && typeof token === 'string' && token.trim() !== '') {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error al obtener el token del localStorage:", error);
    }
    return config;
  },
  (error) => {
    console.error("Error en el interceptor de solicitud:", error); // Depuración
    return Promise.reject(error);
  }
);
// Interceptor de respuesta para manejar errores comunes
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error("No autenticado. Redirigiendo a la página de inicio de sesión...");
        window.location.href = '/login';
      } else if (status === 403) {
        console.error("Acceso denegado. No tiene permisos para acceder a este recurso.");
      } else if (status === 500) {
        console.error("Error interno del servidor.");
      }
    } else {
      console.error("Error de red o servidor no disponible.");
    }

    return Promise.reject(error);
  }
);

export default httpClient;
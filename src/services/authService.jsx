import React from 'react'
import { apiUrl } from "./apiUrl";

const API_URL = `${apiUrl}/api/v1/auth/signin`;

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Correo o contraseña incorrecta');
    }

    const data = await response.json();
    return data; // Aquí regresas el token, id, email y roles
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

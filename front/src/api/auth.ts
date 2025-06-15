import axios from 'axios';

const API_URL = 'http://10.22.168.220:3000/api/auth'; // O IP local en físico

export const login = async (email: string, contraseña: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: email.trim().toLowerCase(),
      contraseña
    });

    return response.data; // { token, usuario, rol }
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
  }
};

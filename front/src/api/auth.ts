import axios from 'axios';

const API_URL = 'http://10.22.168.220:3000/api';

export const login = async (email: string, contraseña: string) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, contraseña });
    return res.data;
  } catch (err: any) {
    console.log('❌ Error al iniciar sesión:', err.response?.data || err.message);
    throw err.response?.data || { message: 'Error de conexión' };
  }
};

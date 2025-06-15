// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conectarDB } from './config/db';
import usuarioRoutes from './routes/usuario.routes';

// Cargar variables de entorno
dotenv.config();

// Crear app Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a base de datos
conectarDB();

// Rutas
app.use('/api', usuarioRoutes);

// Puerto desde env o por defecto
const PORT = Number(process.env.PORT) || 3000;

// Escuchar en todas las IPs disponibles (accesible desde celulares)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

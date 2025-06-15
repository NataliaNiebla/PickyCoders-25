import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import clienteRoutes from './routes/cliente.routes';
import asesorRoutes from './routes/asesor.routes';

dotenv.config(); // para usar variables del archivo .env

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // para leer JSON en el body

// Rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/asesores', asesorRoutes);

app.use('/api/auth', authRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL || '', {
})
  .then(() => console.log('🟢 MongoDB conectado'))
  .catch(err => console.error('❌ Error al conectar MongoDB', err));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

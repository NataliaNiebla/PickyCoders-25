// src/models/Cliente.ts
import mongoose from 'mongoose';

const Cliente = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  contrasena: { type: String, required: true },
  rol: { type: String, enum: ['cliente'], default: 'cliente' },
  direccion: { type: String, required: true },
  numeroRefrigeradores: { type: Number, required: true },
  ubicacion: {
    latitud: { type: Number, required: true },
    longitud: { type: Number, required: true },
  },
  estadoServicio: { type: String, default: 'activo' },
  fechaRegistro: { type: Date, default: Date.now },
  asesor: { type: mongoose.Schema.Types.ObjectId, ref: 'Asesor', required: true },
});

export default mongoose.model('Cliente', Cliente, 'clientes'); // 'clientes' es el nombre de la colección en MongoDB

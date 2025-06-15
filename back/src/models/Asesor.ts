// src/models/Asesor.ts
import mongoose from 'mongoose';

const asesorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['asesor'], default: 'asesor' },
  zona: { type: String, required: true }, // código postal
}, {
  timestamps: true
});

export default mongoose.model('Asesor', asesorSchema, 'asesors'); // 'asesores' es el nombre de la colección en MongoDB

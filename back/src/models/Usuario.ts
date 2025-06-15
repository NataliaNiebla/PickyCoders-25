import mongoose, { Document, Schema } from 'mongoose';

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  contraseña: string;
  rol: 'admin' | 'usuario';
  zona?: {
    nombre: string;
    lat: number;
    lng: number;
  };
}

const usuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'usuario'], default: 'usuario' },
  zona: {
    nombre: String,
    lat: Number,
    lng: Number,
  }
});

const Usuario = mongoose.model<IUsuario>('Usuario', usuarioSchema);
export default Usuario;

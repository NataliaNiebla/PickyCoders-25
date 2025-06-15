import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    contraseña: { type: String, required: true },
    rol: { type: String, enum: ['usuario', 'cliente'], default: 'cliente' },

    zona: { // Solo para asesores
      nombre: String,
      lat: Number,
      lng: Number,
    },

    ubicacion: { // Solo para clientes
      direccion: String,
      lat: Number,
      lng: Number,
    },

    refrigerador: { // Solo para clientes
      estado: { type: String, enum: ['OK', 'ALERTA', 'APAGADO'], default: 'OK' },
      temperatura: Number,
      corriente: Number,
      peso: Number,
      aperturas: Number,
    }
  },
  { timestamps: true }
);

export const Usuario = mongoose.model('Usuario', UsuarioSchema);

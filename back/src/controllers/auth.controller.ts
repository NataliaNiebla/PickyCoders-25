import Asesor from '../models/Asesor';
import Cliente from '../models/Cliente';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Document, Types } from 'mongoose';


const SECRET = process.env.JWT_SECRET || 'supersecreto123';

export const login = async (req: { body: { email: any; contraseña: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; token?: string; usuario?: Document<unknown, {}, { createdAt: NativeDate; updatedAt: NativeDate; } & { nombre: string; email: string; contraseña: string; rol: "asesor"; zona: string; }, {}> & { createdAt: NativeDate; updatedAt: NativeDate; } & { nombre: string; email: string; contraseña: string; rol: "asesor"; zona: string; } & { _id: Types.ObjectId; } & { __v: number; }; rol?: string; }): void; new(): any; }; }; }) => {
  const { email, contraseña } = req.body;

  // Buscar primero en asesores
  let user = await Asesor.findOne({ email });
  let rol = 'asesor';

  if (!user) {
    user = await Cliente.findOne({ email });
    rol = 'cliente';
  }

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const valido = await bcrypt.compare(contraseña, user.contraseña);
  if (!valido) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ id: user._id, rol }, SECRET, {
    expiresIn: '2d'
  });

  res.status(200).json({ token, usuario: user, rol });
};

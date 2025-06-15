// src/controllers/asesor.controller.ts
import Asesor from '../models/Asesor';
import bcrypt from 'bcryptjs';import jwt from 'jsonwebtoken';
import { Document, Types } from 'mongoose';

const SECRET = process.env.JWT_SECRET || 'secreto123';

export const registrarAsesor = async (req: { body: { nombre: any; email: any; contraseña: any; zona: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): void; new(): any; }; }; }) => {
  try {
    const { nombre, email, contraseña, zona } = req.body;

    const asesorExistente = await Asesor.findOne({ email });
    if (asesorExistente) {
      return res.status(400).json({ error: 'El asesor ya existe' });
    }

    const hashed = await bcrypt.hash(contraseña, 10);

    const nuevoAsesor = new Asesor({
      nombre,
      email,
      contraseña: hashed,
      zona
    });

    await nuevoAsesor.save();

    res.status(201).json({ message: 'Asesor registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar asesor' });
  }
};


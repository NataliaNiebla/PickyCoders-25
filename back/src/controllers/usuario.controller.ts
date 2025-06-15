import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';
import { routerUser } from '../utils/sendEmail';


const generarToken = (usuario: any) => {
  return jwt.sign(
    {
      id: usuario._id,
      rol: usuario.rol,
      zona: usuario.zona,
    },
    process.env.JWT_SECRET || 'secreto',
    { expiresIn: '1d' }
  );
};

export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, email, contraseña, rol, zona } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'Ya existe ese correo' });

    const hash = await bcrypt.hash(contraseña, 10);
    const nuevo = new Usuario({ nombre, email, contraseña: hash, rol, zona });
    await nuevo.save();

    const token = generarToken(nuevo);
    res.status(201).json({ usuario: nuevo, token });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: err });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = generarToken(usuario);
    res.json({ usuario, token });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};

export const actualizarMiPerfil = async (req: Request, res: Response) => {
  try {
    const { nombre, zona } = req.body;
    const usuarioId = req.usuario.id;

    const actualizado = await Usuario.findByIdAndUpdate(
      usuarioId,
      { nombre, zona },
      { new: true }
    );

    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar perfil' });
  }
};

export const cambiarContraseña = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.usuario.id;
    const { nuevaContraseña } = req.body;
    const hash = await bcrypt.hash(nuevaContraseña, 10);

    await Usuario.findByIdAndUpdate(usuarioId, { contraseña: hash });
    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al cambiar la contraseña' });
  }
};

export const recuperarContraseña = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    await routerUser(usuario.email, usuario.nombre);
    res.json({ mensaje: 'Se envió el correo de recuperación' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al recuperar contraseña' });
  }
};

export const crearCliente = async (req: Request, res: Response) => {
  try {
    const { nombre, email, zona } = req.body;
    const generica = 'cliente123';

    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'Cliente ya existe' });

    const hash = await bcrypt.hash(generica, 10);
    const cliente = new Usuario({
      nombre,
      email,
      contraseña: hash,
      zona,
      rol: 'usuario',
    });

    await cliente.save();
    res.status(201).json({ mensaje: 'Cliente creado con contraseña genérica' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear cliente' });
  }
};

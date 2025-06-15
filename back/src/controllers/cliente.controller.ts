// src/controllers/cliente.controller.ts
import { Document, Types } from 'mongoose';
import Cliente from '../models/Cliente';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { generarContrasenaAleatoria } from '../utils/generarContrasena';
import bcrypt from 'bcryptjs';

export const crearCliente = async (req: { body: { nombre: any; email:any; direccion: any; numeroRefrigeradores: any; ubicacion: any; estadoServicio: any; }; user: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; cliente?: Document<unknown, {}, { nombre: string; contrasena: string; direccion: string; numeroRefrigeradores: number; estadoServicio: string; fechaRegistro: NativeDate; asesor: Types.ObjectId; ubicacion?: { latitud: number; longitud: number; } | null | undefined; }, {}> & { nombre: string; contrasena: string; direccion: string; numeroRefrigeradores: number; estadoServicio: string; fechaRegistro: NativeDate; asesor: Types.ObjectId; ubicacion?: { latitud: number; longitud: number; } | null | undefined; } & { _id: Types.ObjectId; } & { __v: number; }; contrasenaTemporal?: string; error?: string; }): void; new(): any; }; }; }) => {
  try {
    const {
      nombre, direccion, numeroRefrigeradores,
      ubicacion, estadoServicio, email
    } = req.body;

    const asesorId = req.user.id;

    const contrasenaGenerada = generarContrasenaAleatoria();
    const contrasenaHash = await bcrypt.hash(contrasenaGenerada, 10);

    const cliente = new Cliente({
      nombre,
      email,
      direccion,
      numeroRefrigeradores,
      ubicacion,
      estadoServicio,
      asesor: asesorId,
      contrasena: contrasenaHash
    });

    await cliente.save();

    return res.status(201).json({
      message: 'Cliente registrado exitosamente',
      cliente,
      contrasenaTemporal: contrasenaGenerada
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

export const obtenerClientes = async (
  req: { user: { id: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: (arg0: any) => void;
    };
  }
) => {
  try {
    const asesorId = req.user.id;
    const clientes = await Cliente.find({ asesor: asesorId });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};



export const editarCliente = async (req: { params: { id: any; }; user: { id: any; }; body: { [x: string]: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; cliente?: Document<unknown, {}, { nombre: string; contrasena: string; direccion: string; numeroRefrigeradores: number; estadoServicio: string; fechaRegistro: NativeDate; asesor: Types.ObjectId; ubicacion?: { latitud: number; longitud: number; } | null | undefined; }, {}> & { nombre: string; contrasena: string; direccion: string; numeroRefrigeradores: number; estadoServicio: string; fechaRegistro: NativeDate; asesor: Types.ObjectId; ubicacion?: { latitud: number; longitud: number; } | null | undefined; } & { _id: Types.ObjectId; } & { __v: number; }; }): void; new(): any; }; }; }) => {
  try {
    const clienteId = req.params.id;
    const asesorId = req.user.id;

   
    const cliente = await Cliente.findOne({ _id: clienteId, asesor: asesorId });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const camposActualizables = ['nombre', 'direccion', 'numeroRefrigeradores', 'ubicacion', 'estadoServicio'] as const;
    camposActualizables.forEach(campo => {
      if (req.body[campo] !== undefined) {
        (cliente as any)[campo] = req.body[campo];
      }
    });

    await cliente.save();
    res.status(200).json({ message: 'Cliente actualizado', cliente });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

export const eliminarCliente = async (req: { params: { id: any; }; user: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): void; new(): any; }; }; }) => {
  try {
    const clienteId = req.params.id;
    const asesorId = req.user.id;

    const cliente = await Cliente.findOneAndDelete({ _id: clienteId, asesor: asesorId });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};

// Solo el cliente puede cambiar su contraseña

export const cambiarContrasenaCliente = async (
  req: { user: { id: string }; body: { contrasenaActual: string; nuevaContrasena: string } },
  res: { status: (arg: number) => { json: (arg: any) => void } }
) => {
  try {
    const clienteId = req.user.id;
    const { contrasenaActual, nuevaContrasena } = req.body;

    const cliente = await Cliente.findById(clienteId);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    const valido = await bcrypt.compare(contrasenaActual, cliente.contrasena);
    if (!valido) return res.status(401).json({ error: 'Contraseña actual incorrecta' });

    cliente.contrasena = await bcrypt.hash(nuevaContrasena, 10);
    await cliente.save();

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar contraseña' });
  }
};

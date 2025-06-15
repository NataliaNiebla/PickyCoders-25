// src/routes/cliente.routes.ts
import express from 'express';
import { crearCliente, editarCliente, eliminarCliente,cambiarContrasenaCliente } from '../controllers/cliente.controller';
import { verificarToken } from '../middlewares/auth';
import { obtenerClientes } from '../controllers/cliente.controller';


const router = express.Router();

router.post('/clientes', verificarToken, crearCliente);
router.get('/clientes', verificarToken, obtenerClientes);
router.put('/clientes/:id', verificarToken, editarCliente);
router.delete('/clientes/:id', verificarToken, eliminarCliente);
router.put('/cliente/contrasena', verificarToken, cambiarContrasenaCliente);



export default router;

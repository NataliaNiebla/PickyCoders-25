import express from 'express';
import {
  registrarUsuario,
  loginUsuario,
  actualizarMiPerfil,
  cambiarContraseña,
  recuperarContraseña,
  crearCliente
} from '../controllers/usuario.controller';
import { auth, soloAdmin, soloUsuario } from '../middlewares/auth';

const routerUser = express.Router();

routerUser.post('/register', registrarUsuario);
routerUser.post('/login', loginUsuario);
routerUser.put('/mi-perfil', auth, actualizarMiPerfil);
routerUser.patch('/mi-password', auth, cambiarContraseña);
routerUser.post('/recuperar-password', recuperarContraseña);
routerUser.post('/crear-cliente', auth, soloUsuario, crearCliente);

export default routerUser;

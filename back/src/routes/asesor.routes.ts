// src/routes/asesor.routes.ts
import express from 'express';
import { registrarAsesor } from '../controllers/asesor.controller';

const router = express.Router();

router.post('/register', registrarAsesor);

export default router;

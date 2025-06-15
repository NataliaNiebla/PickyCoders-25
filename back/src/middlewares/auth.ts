import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  rol: 'admin' | 'usuario';
  zona?: any;
}

declare global {
  namespace Express {
    interface Request {
      usuario: JwtPayload;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto') as JwtPayload;
    req.usuario = decoded;
    next();
  } catch {
    res.status(403).json({ mensaje: 'Token inválido' });
  }
};

export const soloAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Solo accesible por administradores' });
  }
  next();
};

export const soloUsuario = (req: Request, res: Response, next: NextFunction) => {
  if (req.usuario.rol !== 'usuario') {
    return res.status(403).json({ mensaje: 'Solo accesible por usuarios asesores' });
  }
  next();
};

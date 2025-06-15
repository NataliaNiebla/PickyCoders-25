// src/middlewares/auth.ts
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secreto123';

export const verificarToken = (req: { headers: { authorization: string; }; user: string | jwt.JwtPayload; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }, next: () => void) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(403).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // ← aquí tenemos el `id` del asesor
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

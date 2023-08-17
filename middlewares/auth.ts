import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = (req.header('Authorization') ?? '').split(' ')[1];

  const secretToken = process.env.SECRET_TOKEN ?? '';

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, secretToken) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;

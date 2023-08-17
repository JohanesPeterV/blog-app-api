import express, { Request, Response, NextFunction } from 'express';
import AuthController from '../controllers/auth';
import AuthMiddleware from '../middlewares/auth';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

export default router;

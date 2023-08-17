import express, { Request, Response, NextFunction, query } from 'express';
import authMiddleware from '../middlewares/auth';
import blogMiddleware from '../middlewares/blog';
import BlogsController from '../controllers/blogs';

const router = express.Router();

router.post('', authMiddleware, BlogsController.create);

router.get('', BlogsController.getAll);

router.get('/:id', BlogsController.getById);

router.put('/:id', [authMiddleware, blogMiddleware], BlogsController.update);

router.delete('/:id', [authMiddleware, blogMiddleware], BlogsController.delete);

export default router;

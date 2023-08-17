import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/auth';
import blogMiddleware from '../middlewares/blog';
import BlogsController from '../controllers/blogs';

const router = express.Router();

router.post('', authMiddleware, BlogsController.create);

router.get('', BlogsController.getAll);

router.get('/:id', BlogsController.getOne);

router.put(
  '/:id',
  [authMiddleware, blogMiddleware],
  BlogsController.updateBlog
);

router.delete(
  '/:id',
  [authMiddleware, blogMiddleware],
  BlogsController.deleteBlog
);

export default router;

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '.prisma/client';
import BlogsRepository from '../repository/blogs';

const prisma = new PrismaClient();

const blogMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogId = req.params.id;
  const userId = req.userId;
  try {
    const blog = await BlogsRepository.getById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.userId !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to manage this blog' });
    }
    next();
  } catch (error) {
    console.error('Blog middleware error:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

export default blogMiddleware;

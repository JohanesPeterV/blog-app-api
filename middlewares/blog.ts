// middlewares/ownership-middleware.ts

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

const blogMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const blogId = req.params.id;
  const userId = req.userId;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { userId: true },
    });

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

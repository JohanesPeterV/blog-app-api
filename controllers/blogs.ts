import { Request, Response, NextFunction } from 'express';
import BlogService from '../services/blogs';
import { CreateBlogDTO } from '../models/dto/blog/create-blog.dto';
import { query, body, validationResult, param } from 'express-validator';

export default class BlogsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { title, content } = req.body as CreateBlogDTO;
    await validateAndSanitizeCreateBlogInputs(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const createdBlog = await BlogService.add({
        title,
        content,
        userId: req.userId,
        userUserName: req.userUserName,
      });
      return res.status(201).json(createdBlog);
    } catch (error) {
      console.error('Error creating blog:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred while creating the blog' });
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const blogId = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const blog = await BlogService.getById(blogId);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      return res.status(200).json(blog);
    } catch (error) {
      console.error('Error fetching blog:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred while fetching the blog' });
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    await validateAndSanitizeCreateBlogInputs(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const blogId = req.params.id;
    const { title, content } = req.body as CreateBlogDTO;

    try {
      const updatedBlog = await BlogService.update(blogId, {
        title,
        content,
      });
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      return res.status(200).json(updatedBlog);
    } catch (error) {
      console.error('Error updating blog:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred while updating the blog' });
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const blogId = req.params.id;

    try {
      const deletedBlog = await BlogService.delete(blogId);
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      return res
        .status(200)
        .json({ message: 'Blog deleted successfully', deletedBlog });
    } catch (error) {
      console.error('Error deleting blog:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred while deleting the blog' });
    }
  }
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const blogs = await BlogService.getAll(page, pageSize);
    return res.status(200).json(blogs);
  }
}
async function validateAndSanitizeCreateBlogInputs(req: Request) {
  await Promise.all([
    body('title').notEmpty().trim().escape().run(req),
    body('content').notEmpty().trim().escape().run(req),
  ]);
}

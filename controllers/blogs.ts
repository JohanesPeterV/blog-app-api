import { Request, Response, NextFunction } from 'express';
import BlogService from '../services/blogs';
import { BlogInputDTO } from '../dto/blog-input.dto';

export default class BlogsController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { title, content } = req.body as BlogInputDTO;

    try {
      const createdBlog = await BlogService.add({
        title,
        content,
        userId: req.userId,
      });
      return res.status(201).json(createdBlog);
    } catch (error) {
      console.error('Error creating blog:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred while creating the blog' });
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    const blogId = req.params.id;
    try {
      const blog = await BlogService.get(blogId);
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
  static async updateBlog(req: Request, res: Response, next: NextFunction) {
    const blogId = req.params.id;
    const blogInputDTO = req.body as BlogInputDTO;

    try {
      const updatedBlog = await BlogService.update(blogId, blogInputDTO);
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

  static async deleteBlog(req: Request, res: Response, next: NextFunction) {
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
    return res.status(200).json({ blogs });
  }
}

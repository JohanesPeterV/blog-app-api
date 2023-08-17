import { Request, Response, NextFunction } from 'express';
import AuthService from './auth';
import BlogsRepository from '../repository/blogs';
import { BlogInputDTO } from '../dto/blog-input.dto';

export default class BlogService {
  public static getAll(page: number, pageSize: number) {
    return BlogsRepository.getAll(page, pageSize);
  }

  public static add(blog: BlogInputDTO) {
    return BlogsRepository.add(blog);
  }

  public static get(id: string) {
    return BlogsRepository.get(id);
  }

  public static update(id: string, blog: Partial<BlogInputDTO>) {
    return BlogsRepository.update(id, blog);
  }

  public static delete(id: string) {
    return BlogsRepository.delete(id);
  }
}

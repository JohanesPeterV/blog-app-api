import { Request, Response, NextFunction } from 'express';
import AuthService from './auth';
import BlogsRepository from '../repository/blogs';
import { CreateBlogDTO } from '../models/dto/blog/create-blog.dto';
import { UpdateBlogDTO } from '../models/dto/blog/update-blog.dto';

export default class BlogService {
  public static getAll(page: number, pageSize: number) {
    return BlogsRepository.getAll(page, pageSize);
  }

  public static add(blog: CreateBlogDTO) {
    return BlogsRepository.add(blog);
  }

  public static get(id: string) {
    return BlogsRepository.get(id);
  }

  public static update(id: string, blog: Partial<UpdateBlogDTO>) {
    return BlogsRepository.update(id, blog);
  }

  public static delete(id: string) {
    return BlogsRepository.delete(id);
  }
}

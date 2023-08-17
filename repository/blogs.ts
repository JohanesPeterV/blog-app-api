import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth';
import { Blog, PrismaClient } from '@prisma/client';
import { BlogInputDTO } from '../dto/blog-input.dto';

const prisma = new PrismaClient();
export default class BlogsRepository {
  static getAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    return prisma.blog.findMany({
      skip: skip,
      take: pageSize,
    });
  }
  static add(blog: BlogInputDTO) {
    return prisma.blog.create({
      data: {
        ...blog,
      },
    });
  }
  static get(id: string) {
    return prisma.blog.findFirst({
      where: {
        id: id,
      },
    });
  }
  static update(id: string, blog: Partial<BlogInputDTO>) {
    return prisma.blog.update({
      where: {
        id: id,
      },
      data: blog,
    });
  }
  static delete(id: string) {
    return prisma.blog.delete({
      where: {
        id: id,
      },
    });
  }
}

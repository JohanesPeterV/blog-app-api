import { PrismaClient } from '@prisma/client';
import { CreateBlogDTO } from '../models/dto/blog/create-blog.dto';
import { UpdateBlogDTO } from '../models/dto/blog/update-blog.dto';

const prisma = new PrismaClient();
export default class BlogsRepository {
  static getAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    return prisma.blog.findMany({
      skip: skip,
      take: pageSize,
    });
  }
  static getDataCount() {
    return prisma.blog.count();
  }
  static add(blog: CreateBlogDTO) {
    return prisma.blog.create({
      data: {
        ...blog,
      },
    });
  }
  static getById(id: string) {
    return prisma.blog.findFirst({
      where: {
        id: id,
      },
    });
  }
  static update(id: string, blog: UpdateBlogDTO) {
    return prisma.blog.update({
      where: {
        id: id,
      },
      data: blog,
      include: {},
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

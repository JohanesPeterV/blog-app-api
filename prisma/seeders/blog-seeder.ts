import blogSeedList from './blog-seeder-data';
import { PrismaClient } from '.prisma/client';
import { BlogSeed } from './models/blog-seed';
import { BlogUser } from '../../models/blog-user';

export default class BlogSeeder {
  constructor(public prisma: PrismaClient, public userList: BlogUser[]) {}

  seed() {
    blogSeedList.forEach(this.insert.bind(this));
  }

  async insert(blogSeed: BlogSeed) {
    const currUser =
      this.userList[Math.floor(Math.random() * this.userList.length)];
    await this.prisma.blog.create({
      data: {
        ...blogSeed,
        userId: currUser.userId,
        userUserName: currUser.userUserName,
      },
    });
  }
}

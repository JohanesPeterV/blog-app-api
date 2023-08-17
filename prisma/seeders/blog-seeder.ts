import blogSeedList from './blog-seeder-data';
import { PrismaClient } from '.prisma/client';
import { BlogSeed } from './models/blog-seed';

export default class BlogSeeder {
  constructor(public prisma: PrismaClient, public userIdList: string[]) {}

  seed() {
    blogSeedList.forEach(this.insert.bind(this));
  }

  async insert(blogSeed: BlogSeed) {
    await this.prisma.blog.create({
      data: {
        ...blogSeed,
        userId:
          this.userIdList[Math.floor(Math.random() * this.userIdList.length)],
      },
    });
  }
}

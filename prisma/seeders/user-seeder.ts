import argon2 from 'argon2';
import { PrismaClient } from '.prisma/client';
import { userSeedList } from './user-seeder-data';
import { UserSeed } from './models/user-seed';
import { BlogUser } from '../../models/blog-user';

export default class UserSeeder {
  public prisma: PrismaClient;
  public userList: BlogUser[] = [];
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async seed() {
    for (const userSeed of userSeedList) {
      await this.upsert(userSeed);
    }
    return this.userList;
  }

  async upsert(userSeed: UserSeed) {
    userSeed.password = await argon2.hash(userSeed.password);
    const user = await this.prisma.user.upsert({
      where: {
        email: userSeed.email,
      },
      update: userSeed,
      create: userSeed,
    });

    this.userList.push({
      userId: user.id,
      userUserName: user.userName,
    });
  }
}

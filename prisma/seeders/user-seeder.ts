import argon2 from 'argon2';
import { PrismaClient } from '.prisma/client';
import { userSeedList } from './user-seeder-data';
import { UserSeed } from './models/user-seed';

export default class UserSeeder {
  public prisma: PrismaClient;
  public userIdList: string[] = [];
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async seed() {
    for (const userSeed of userSeedList) {
      await this.upsert(userSeed);
    }
    return this.userIdList;
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

    this.userIdList.push(user.id);
  }
}

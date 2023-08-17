import { PrismaClient } from '.prisma/client';
import UserSeeder from './seeders/user-seeder';
import BlogSeeder from './seeders/blog-seeder';

const prisma = new PrismaClient();

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function seed() {
  const userIdList = await new UserSeeder(prisma).seed();
  new BlogSeeder(prisma, userIdList).seed();
}

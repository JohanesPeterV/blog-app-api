import { PrismaClient } from '.prisma/client';
import { UserInputDTO } from '../models/dto/user-input.dto';

const prisma = new PrismaClient();

export default class UserRepository {
  static async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
  static async createUser(userData: UserInputDTO) {
    return prisma.user.create({ data: userData });
  }
}

import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import UserRepository from '../repository/users';
import { UserInputDTO } from '../dto/user-input.dto';

export default class AuthService {
  static async login(email: string, password: string) {
    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid) {
      return null;
    }

    return user;
  }

  static generateToken(userId: number | string, expiresIn: string) {
    const secretToken = process.env.SECRET_TOKEN ?? '';
    return jwt.sign({ userId }, secretToken, { expiresIn });
  }

  static async registerUser(userData: UserInputDTO) {
    const hashedPassword = await argon2.hash(userData.password);
    const newUser = { ...userData, password: hashedPassword };
    return UserRepository.createUser(newUser);
  }
}

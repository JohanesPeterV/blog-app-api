import argon2 from 'argon2';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserRepository from '../repository/users';
import { UserInputDTO } from '../models/dto/user-input.dto';
import { LoginDTO } from '../models/dto/login.dto';

export default class AuthService {
  static async login(loginDTO: LoginDTO) {
    const user = await UserRepository.findUserByEmail(loginDTO.email);

    if (!user) {
      return null;
    }

    const passwordValid = await argon2.verify(user.password, loginDTO.password);

    if (!passwordValid) {
      return null;
    }

    return user;
  }

  static generateToken(user: JwtPayload) {
    const secretToken = process.env.SECRET_TOKEN ?? '';
    const expiresIn = '1h';
    return jwt.sign(user, secretToken, { expiresIn });
  }

  static async register(userData: UserInputDTO) {
    const hashedPassword = await argon2.hash(userData.password);
    const newUser = { ...userData, password: hashedPassword };
    return UserRepository.createUser(newUser);
  }
}

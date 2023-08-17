import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth';
import { UserInputDTO } from '../models/dto/user-input.dto';

export default class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await AuthService.login(email, password);

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const tokenDuration = '1h';
      const token = AuthService.generateToken(
        { userId: user.id, userUserName: user.userName },
        tokenDuration
      );

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred while logging in' });
    }
  }
  static async register(req: Request, res: Response, next: NextFunction) {
    const { confirmPassword, ...userInputDTO } = req.body as UserInputDTO & {
      confirmPassword: string;
    };
    if (userInputDTO.password != confirmPassword) {
      return res
        .status(422)
        .json({ message: "Password and Confirm Password doesn't match" });
    }
    try {
      const user = await AuthService.registerUser(userInputDTO);
      const tokenDuration = '1h';
      const token = AuthService.generateToken(
        { userId: user.id, userUserName: user.userName },
        tokenDuration
      );
      return res
        .status(201)
        .json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Registration error:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred while registering' });
    }
  }
}

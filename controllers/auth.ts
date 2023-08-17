import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth';
import { UserInputDTO } from '../models/dto/user-input.dto';
import { body, validationResult } from 'express-validator';

export default class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    await validateAndSanitizeLogin(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await AuthService.login({ email, password });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = AuthService.generateToken({
        userId: user.id,
        userUserName: user.userName,
      });

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred while logging in' });
    }
  }
  static async register(req: Request, res: Response, next: NextFunction) {
    await validateAndSanitizeRegister(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { confirmPassword, userName, name, password, email } =
      req.body as UserInputDTO & {
        confirmPassword: string;
      };
    if (password != confirmPassword) {
      return res
        .status(422)
        .json({ message: "Password and Confirm Password doesn't match" });
    }
    try {
      const user = await AuthService.register({
        userName,
        name,
        password,
        email,
      });
      const token = AuthService.generateToken({
        userId: user.id,
        userUserName: user.userName,
      });
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

async function validateAndSanitizeLogin(req: Request) {
  await Promise.all([
    body('email').isEmail().bail().trim().escape().run(req),
    body('password').notEmpty().bail().run(req),
  ]);
}

async function validateAndSanitizeRegister(req: Request) {
  await Promise.all([
    body('email').isEmail().bail().trim().escape().run(req),
    body('name').notEmpty().bail().trim().escape().run(req),
    body('userName').notEmpty().bail().trim().escape().run(req),
    body('password').notEmpty().bail().run(req),
  ]);
}

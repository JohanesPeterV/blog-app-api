import { BlogUser } from '../models/blog-user';
declare module 'jsonwebtoken' {
  export interface JwtPayload extends BlogUser {
    userUserName: string;
  }
}

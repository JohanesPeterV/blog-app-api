import jwt from 'jsonwebtoken';
declare module 'jsonwebtoken' {
  export interface JwtPayload {
    userId: string;
  }
}

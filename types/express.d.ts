import { Request } from 'express-serve-static-core';
declare module 'express-serve-static-core' {
  export interface Request {
    userId: string;
    userUserName: string;
  }
}

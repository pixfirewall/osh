import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { unauthorizedError } from '../exceptions';

/**
 *
 * @description this function will authorize the user based on role.
 */
export const authorization = (role: Role) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.userInfo || req.userInfo.role !== role) {
    const { code, message } = unauthorizedError('You dont have permission for this resource.');
    return res.status(code).send(message);
  }
  return next();
};

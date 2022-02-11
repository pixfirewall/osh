import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { prisma, Prisma, Role } from '../db';

import logger from '../../logger';

const service = { service: 'user-servie' };
const { hashSalt, jwtExp, jwtSecret } = config.get('app');

export const userService = {
  /**
   *
   * @description this function is responsible for creating a new user and only accessible for admin users.
   */
  create: async (email: string, pwd: string, name: string, role: Role) => {
    const password = await userService.generateHash(pwd);

    try {
      const result = await prisma.user.create({
        data: {
          name,
          email,
          password,
          role,
        },
      });
      return result;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        /**
         * "Unique constraint failed on the {constraint}"
         * refer to https://www.prisma.io/docs/reference/api-reference/error-reference for more info for prisma error codes
         */
        if (e.code === 'P2002') {
          const message = 'a user with this email is already exist.';
          logger.error(message, service);
          throw new Error(message);
        }
      }
      throw e;
    }
  },

  /**
   *
   * @description this function is responsible for generating a new hash code.
   */
  generateHash: async (password: string) => {
    const salt = await bcrypt.genSalt(Number(hashSalt));
    return bcrypt.hash(password, salt);
  },

  /**
   *
   * @description this function is responsible for compairing two passwords.
   */
  compareHash: (p1: string, p2: string) => bcrypt.compare(p1, p2),

  /**
   *
   * @description this function is responsible for generating a new JWT token.
   */
  createJwtToken: (data: any) =>
    jwt.sign(
      {
        exp: Number(jwtExp),
        data,
      },
      jwtSecret
    ),

  /**
   *
   * @description this function is responsible for getting a user by email address.
   */
  getUserByEmail: (email: string) =>
    prisma.user.findUnique({ where: { email }, select: { id: true, email: true, password: true, role: true } }),
};

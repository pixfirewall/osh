import { prisma, Prisma, Product } from '../db';
import logger from '../../logger';

export const productService = {
  /**
   *
   * @description this function is responsible for creating a new product.
   */
  create: async ({ title, description, brand, type, price, discount, image }: NewProduct) => {
    try {
      const product = await prisma.product.create({
        data: {
          title,
          description,
          brand,
          type,
          price,
          discount,
          image: JSON.stringify(image),
        },
      });
      logger.info('create a new product', { product });
      return product;
    } catch (e) {
      throw e;
    }
  },

  /**
   *
   * @description this function is responsible for getting list of all products with pagination.
   */
  getProducts: (page = 1, size = 10) =>
    prisma.$transaction([
      prisma.product.count(),
      prisma.product.findMany({
        skip: (page - 1) * size,
        take: size,
      }),
    ]),

  /**
   *
   * @description this function is responsible for getting the most visited products with pagination.
   */
  getMostVisitedProducts: (page = 1, size = 10) =>
    prisma.$transaction([
      prisma.product.count(),
      prisma.product.findMany({
        skip: (page - 1) * size,
        take: size,
        orderBy: { visited: 'desc' },
      }),
    ]),

  /**
   *
   * @description this function is responsible for getting a product base on ID.
   */
  getProductById: async (id: number) => {
    const [_, product] = await prisma.$transaction([
      prisma.product.update({
        where: { id },
        data: { visited: { increment: 1 } },
      }),
      prisma.product.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          description: true,
          brand: true,
          type: true,
          price: true,
          discount: true,
          image: true,
        },
      }),
    ]);
    product.image = JSON.parse(product.image);
    return product;
  },

  /**
   *
   * @description this function is responsible for updating a product based on ID.
   */
  updateProductById: async (id: number, data: Product) => {
    try {
      const product = await prisma.product.update({ where: { id }, data });
      logger.info('update product by id', { product });
      delete product.visited;
      product.image = JSON.parse(product.image);
      return product;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        /**
         * An operation failed because it depends on one or more records that were required but not found. {cause}
         * refer to https://www.prisma.io/docs/reference/api-reference/error-reference for more info for prisma error codes
         */
        if (e.code === 'P2025') {
          const message = `product id ${id} is not valid.`;
          throw new Error(message);
        }
      }
      throw e;
    }
  },
};

export interface NewProduct {
  title: string;
  description: string;
  brand: string;
  type: string;
  price: number;
  discount: number;
  image: string[];
}

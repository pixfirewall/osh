import { prisma, Prisma } from '../db';

export const wishlistService = {
  /**
   *
   * @description this function is responsible for getting list of wishlist for the authenticated user.
   */
  getWishList: (userId: number) => prisma.wishlist.findMany({ where: { userId }, include: { product: true } }),

  /**
   *
   * @description this function is responsible for add a product to the user wishlist.
   */
  addToWishList: async (userId: number, productId: number) => {
    try {
      await prisma.wishlist.create({ data: { userId, productId } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        /**
         * "Unique constraint failed on the {constraint}"
         * refer to https://www.prisma.io/docs/reference/api-reference/error-reference for more info for prisma error codes
         */
        if (e.code === 'P2002') {
          const message = 'This product is already exist in your wishlist.';
          throw new Error(message);
        }
      }
      throw e;
    }
  },

  /**
   *
   * @description this function is responsible for delete a product from the user wishlist.
   */
  deleteProductFromWishList: (id: number) => prisma.wishlist.delete({ where: { id } }),
};

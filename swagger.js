const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Online Shop API',
    description: `Online Shop API is an online shopping festival.`,
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
  host: 'localhost:8010',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    addUser: {
      name: 'Amir Hodaee',
      email: 'amir@snappymob.com',
      password: 'Admin@123',
    },
    addWishList: {
      productId: 1,
    },
    login: {
      email: 'amir@snappymob.com',
      password: 'Admin@123',
    },
    addProduct: {
      title: 'Shoes',
      description: 'a bran new shoes for men',
      brand: 'H&M',
      type: 'Clothing',
      price: 1200,
      discount: 15.99,
      image: ['https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200'],
    },
    productResponse: {
      id: 1,
      title: 'Shoes',
      description: 'a bran new shoes for men',
      brand: 'H&M',
      type: 'Clothing',
      price: 1200,
      discount: 15.99,
      image: ['https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200'],
    },
    productsResponse: {
      data: [
        {
          id: 1,
          title: 'Shoes',
          description: 'a bran new shoes for men',
          brand: 'H&M',
          type: 'Clothing',
          price: 1200,
          discount: 15.99,
          image: ['https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200'],
        },
      ],
      page: 1,
      totalPage: 1,
    },
    deleteWishlistResponse: { id: 6, userId: 32, productId: 1 },
    userResponse: {
      id: 1,
    },
    loginResponse: {
      data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDQyOTE1NDAsImRhdGEiOnsiZW1haWwiOiJhbWlyQHNuYXBweW1vYi5jb20ifSwiaWF0IjoxNjQ0Mjg3OTQwfQ.qBWLH4kK-NNvAIa78yMFoNkfm9DIgPg8eilE1PU1xGk',
    },
    productNotFound: {
      error_code: 'DATA_NOT_FOUND_ERROR',
      message: 'product id x is not valid.',
    },
    notFoundError: {
      error_code: 'DATA_NOT_FOUND_ERROR',
      message: 'Could not find any data',
    },
    serverError: {
      error_code: 'SERVER_ERROR',
      message: 'Unknown error',
    },
    validationError: {
      error_code: 'VALIDATION_ERROR',
      message: 'Data is not valid.',
    },
    unauthorizedError: {
      error_code: 'UNAUTHORIZED_ERROR',
      message: "You don't have access to this resource.",
    },
  },
};

swaggerAutogen(outputFile, ['./src/routes/*'], doc);

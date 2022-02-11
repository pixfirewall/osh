import request from 'supertest';
import { prisma, Role } from '../db';
import router from '../server/router';
import { products, users } from '../../prisma/rubbishData';
import express from 'express';
import { userService } from '../services';

let app;
let server;
let token;

describe('Check API products functionality', () => {
  beforeAll(
    () =>
      new Promise(async (res) => {
        const userList = prisma.user.createMany({
          data: await Promise.all(
            users.map(async (u) => ({ ...u, password: await userService.generateHash(u.password) }))
          ),
        });
        const productList = prisma.product.createMany({
          data: products.map((p, id) => ({ ...p, id, image: JSON.stringify(p.image) })),
        });
        await prisma.$transaction([userList, productList]);
        app = router(express());
        server = app.listen(8020);
        const {
          body: { data },
        } = await request(app).post('/users/login').send({
          email: 'amir@snappymob.com',
          password: 'Admin@123',
        });
        token = data;
        res(data);
      })
  );

  afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany();
    const deleteProducts = prisma.product.deleteMany();
    const deleteWishlist = prisma.wishlist.deleteMany();
    await prisma.$transaction([deleteWishlist, deleteUsers, deleteProducts]);
    await prisma.$disconnect();
    app.removeAllListeners();
    server.close();
  });

  it('should get products list', async () => {
    const response = await request(app).get('/products').expect(200);
    expect(response.body).toEqual({
      data: [
        {
          id: 0,
          title: 'Shoes',
          description: 'a bran new shoes for men',
          brand: 'H&M',
          type: 'Clothing',
          price: 1200,
          discount: 15.99,
          image: ['https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200'],
          visited: 0,
        },
        {
          id: 1,
          title: 'Peugeot 2008',
          description: 'a good car.',
          brand: 'Peugeot',
          type: 'Vehicle',
          price: 45000,
          discount: 20.99,
          image: [
            'https://picsum.photos/200',
            'https://picsum.photos/200',
            'https://picsum.photos/200',
            'https://picsum.photos/200',
          ],
          visited: 0,
        },
      ],
      page: 1,
      totalPage: 1,
    });
  });

  it('should get product by id', async () => {
    const response = await request(app).get('/products/1').expect(200);
    expect(response.body).toEqual({
      data: {
        id: 1,
        title: 'Peugeot 2008',
        description: 'a good car.',
        brand: 'Peugeot',
        type: 'Vehicle',
        price: 45000,
        discount: 20.99,
        image: [
          'https://picsum.photos/200',
          'https://picsum.photos/200',
          'https://picsum.photos/200',
          'https://picsum.photos/200',
        ],
      },
    });
  });

  it('should create a new product as admin user', async () => {
    const response = await request(app)
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'Peugeot 307',
        description: 'new 2022 car',
        brand: 'Peugeot',
        type: 'Vehicle',
        price: 30000,
        discount: 200,
        image: [
          'https://picsum.photos/200',
          'https://picsum.photos/200',
          'https://picsum.photos/200',
          'https://picsum.photos/200',
        ],
      })
      .expect(200);
    expect(typeof response.body.data).toBe('number');
  });

  it('should update a product as admin user', async () => {
    const response = await request(app)
      .put('/products/1')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'Peugeot 307',
      })
      .expect(200);
    expect(response.body.data).toEqual({
      id: 1,
      title: 'Peugeot 307',
      description: 'a good car.',
      brand: 'Peugeot',
      type: 'Vehicle',
      price: 45000,
      discount: 20.99,
      image: [
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
        'https://picsum.photos/200',
      ],
    });
  });

  it('should return most visited products', async () => {
    const response = await request(app).get('/products/most-viewed').expect(200);
    expect(response.body).toEqual({
      data: [
        {
          id: 1,
          title: 'Peugeot 307',
          description: 'a good car.',
          brand: 'Peugeot',
          type: 'Vehicle',
          price: 45000,
          discount: 20.99,
          image: [
            'https://picsum.photos/200',
            'https://picsum.photos/200',
            'https://picsum.photos/200',
            'https://picsum.photos/200',
          ],
          visited: 1,
        },
        {
          id: 0,
          title: 'Shoes',
          description: 'a bran new shoes for men',
          brand: 'H&M',
          type: 'Clothing',
          price: 1200,
          discount: 15.99,
          image: ['https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200'],
          visited: 0,
        },
        {
          id: expect.any(Number),
          title: 'Peugeot 307',
          description: 'new 2022 car',
          brand: 'Peugeot',
          type: 'Vehicle',
          price: 30000,
          discount: 200,
          image: [
            'https://picsum.photos/200',
            'https://picsum.photos/200',
            'https://picsum.photos/200',
            'https://picsum.photos/200',
          ],
          visited: 0,
        },
      ],
      page: 1,
      totalPage: 1,
    });
  });
});

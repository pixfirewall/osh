const { Role } = require('@prisma/client');

module.exports = {
  products: [
    {
      title: 'Shoes',
      description: 'a bran new shoes for men',
      brand: 'H&M',
      type: 'Clothing',
      price: 1200,
      discount: 15.99,
      image: ['https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200'],
    },
    {
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
  ],
  users: [
    {
      name: 'Amir',
      email: 'amir@snappymob.com',
      password: 'Admin@123',
      role: Role.ADMIN,
    },
    {
      name: 'Alice',
      email: 'alice@snappymob.com',
      password: 'Admin@123',
      role: Role.USER,
    },
    {
      name: 'Sagar',
      email: 'Sagar@snappymob.com',
      password: 'Admin@123',
      role: Role.USER,
    },
  ],
};

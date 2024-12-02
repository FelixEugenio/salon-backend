import request from 'supertest';
import {app} from '../server';  // Sua instância Express
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('UserController', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  it('should create a user via the API', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        phoneNumber: '9876543210',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Jane Doe');
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});

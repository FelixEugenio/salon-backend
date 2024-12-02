import { PrismaClient } from '@prisma/client';
import { UserService } from '../services/user-service';  // Ajuste conforme o seu caminho


const prisma = new PrismaClient();
const userService = new UserService();

describe('UserService', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();  // Limpa a tabela de usuários antes dos testes
  });

  it('should create a user successfully', async () => {
    const user = await userService.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phoneNumber: '1234567890',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john.doe@example.com');
  });

  afterAll(async () => {
    await prisma.$disconnect();  // Desconecta do Prisma após os testes
  });
});

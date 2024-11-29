import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";  // Certifique-se de importar 'faker' corretamente

//npx ts-node src/seeders/seed.ts

const prisma = new PrismaClient();

async function seedUsers() {
  const users = [];

  for (let i = 0; i < 1000; i++) {
    const user = {
      name: faker.internet.userName(),  // Gera um nome aleatório
      email: faker.internet.email(),  // Gera um e-mail aleatório
      password: faker.internet.password(),  // Gera uma senha aleatória
      banner: faker.image.avatar(),  // Gera uma URL de imagem de avatar
      phoneNumber: faker.phone.number(),  // Corrigido para 'phone.number()' se for @faker-js/faker
    };
    users.push(user);
  }

  try {
    // Usando createMany para inserir todos os usuários de uma vez
    await prisma.user.createMany({
      data: users,
      skipDuplicates: true,  // Ignora duplicatas caso o e-mail seja único
    });

    console.log("Seed completed successfully!");
  } catch (err) {
    console.error("Error seeding users:", err);
  } finally {
    await prisma.$disconnect();  // Desconecta do Prisma ao finalizar
  }
}

seedUsers();


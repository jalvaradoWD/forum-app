import { User, Topic } from './../node_modules/.prisma/client/index.d';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { prisma } from './db';

export const generateFakeUser = async (n: number) => {
  const result = [];

  for (let i = 0; i < n; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(firstName, lastName);
    let fullName = `${firstName} ${lastName} `;
    const hashedPassword = await bcrypt.hash('password', 10);

    result.push({ email, password: hashedPassword, name: fullName });
  }

  return result;
};

export const updateUsersTopics = async (
  topics: Topic[],
  user: User,
  categoryId: string
) => {
  await prisma.user.update({
    where: { id: user.id },
    data: {
      Topic: {
        createMany: { data: await generateUserTopics(topics, categoryId) },
      },
    },
  });
};

const generateUserTopics = async (
  topics: Topic[],
  categoryId: string
): Promise<any[]> => {
  let result: any[] = [];

  Math.floor(Math.random() * topics.length);

  for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
    result.push({
      title: faker.lorem.words(Math.floor(Math.random() * 3) + 1),
      description: faker.lorem.paragraphs(Math.floor(Math.random() * 2)),
      categoryId,
    });
  }

  return result;
};

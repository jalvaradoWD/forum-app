import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';
import { faker } from '@faker-js/faker';

const handler = nc<NextApiRequest, NextApiResponse>();

interface ITopic {
  title: string;
  description: string;
  tags: string[];
  categoryId: string;
  userId: string;
}

const createListOfTopic = () => {
  let list: ITopic[] = [];

  for (let i = 0; i < 10; i++) {
    let fakerData = {
      title: faker.lorem.words(4),
      description: faker.lorem.paragraph(2),
      tags: faker.lorem.words(10).split(' '),
      categoryId: 'bb588345-e650-4001-b8f1-3ce30b0dfb57',
      userId: 'cl4f2n2mf0006ipyh847fwrbk',
    };

    list.push(fakerData);
  }
  return list;
};

handler.post(async (req, res) => {
  const result = createListOfTopic();
  await prisma.topic.createMany({ data: result });

  res.json({
    message: 'test',
  });
});

export default handler;

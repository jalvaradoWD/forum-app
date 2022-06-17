import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { id } = req.query;
  const foundCategory = await prisma.category.findFirst({
    where: {
      id: <string>id,
    },
    include: { Topic: true },
  });

  res.json(foundCategory);
});

export default handler;

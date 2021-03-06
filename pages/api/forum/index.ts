import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const foundCategories = await prisma?.forum.findMany({
    include: { Category: true },
  });

  res.json(foundCategories);
});

export default handler;

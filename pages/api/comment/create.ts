import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { body, topicId } = req.body;
  const session = await getSession({ req });
  const foundUser = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  await prisma.comment.create({
    data: { body, topicId, userId: foundUser?.id! },
  });

  return res.status(200).json({ message: 'Comment created' });
});

export default handler;

import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';
import { authenticateUserMiddleware, AuthUserSession } from '../../../lib/auth';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(authenticateUserMiddleware);

handler.post<AuthUserSession>(async (req, res) => {
  const { title, description, tags, categoryId } = req.body;

  const foundUser = await prisma.user.findFirst({
    where: { email: req.session?.user?.email },
  });

  if (!foundUser) return res.status(400).json({ message: 'User not found' });

  await prisma.topic.create({
    data: { title, description, tags, userId: foundUser?.id, categoryId },
  });

  return res.status(200).json({ message: 'Topic Created' });
});

export default handler;

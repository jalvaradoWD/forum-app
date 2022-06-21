import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';
import {
  authenticateUserMiddleware,
  AuthUserSession,
  setUserSession,
} from '../../../lib/auth';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(setUserSession);
handler.use(authenticateUserMiddleware);

handler.post<AuthUserSession>(authenticateUserMiddleware, async (req, res) => {
  // @TODO Fix the problem where the session shows as undefined.
  const { title, description, categoryId } = req.body;
  const session = req.session;

  console.log(session?.user, '@Test does the user show up');

  if (!session) return res.status(400).json({ message: 'User not logged in' });

  const foundUser = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  if (!foundUser) return res.status(400).json({ message: 'User not found' });

  await prisma.topic.create({
    data: { title, description, userId: foundUser?.id, categoryId },
  });

  return res.status(200).json({ message: 'Topic Created' });
});

export default handler;

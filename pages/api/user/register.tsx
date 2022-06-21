import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import {
  authenticateUserMiddleware,
  IUserCredentials,
} from '../../../lib/auth';
import { prisma } from '../../../lib/db';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(authenticateUserMiddleware);

handler.post(async (req, res) => {
  const { email, password }: IUserCredentials = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { email, password: hashedPassword } });

  return res.status(200).json({ message: 'User created' });
});

export default handler;

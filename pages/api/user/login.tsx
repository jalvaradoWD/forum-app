import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { IUserCredentials } from '../../../lib/auth';
import { prisma } from '../../../lib/db';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { email, password }: IUserCredentials = req.body;

  const foundUser = await prisma.user.findFirst({ where: { email } });

  if (!foundUser) return res.status(400).json({ message: 'User not found' });

  const passwordMatch = await bcrypt.compare(foundUser.password!, password);

  if (!passwordMatch)
    return res.status(400).json({ message: 'Invalid Credentials' });

  const {
    password: userPassword,
    name,
    emailVerified,
    ...restUserInfo
  } = foundUser;

  return restUserInfo;
});

export default handler;

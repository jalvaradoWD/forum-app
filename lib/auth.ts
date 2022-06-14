import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import nc from 'next-connect';

export interface TestInterface extends NextApiRequest {
  session: DefaultSession | null;
}

export const authenticateUserMiddleware = (
  req: TestInterface,
  res: NextApiResponse,
  next: Function
) => {
  console.log(process.env.NODE_ENV);
  if (!req.session?.user && process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'Not Authenticated' });
  }
  next();
};

export const handler = nc<NextApiRequest, NextApiResponse>().use(
  async (req: TestInterface, res: NextApiResponse, next: Function) => {
    const session = await getSession({ req });

    if (session) {
      req.session = session;
    }

    next();
  }
);

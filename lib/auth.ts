import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import nc from 'next-connect';

export interface AuthUserSession extends NextApiRequest {
  session: DefaultSession | null;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export const authenticateUserMiddleware = (
  req: AuthUserSession,
  res: NextApiResponse,
  next: Function
) => {
  if (!req.session?.user && process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'Not Authenticated' });
  }
  next();
};

export const handler = nc<NextApiRequest, NextApiResponse>().use(
  async (req: AuthUserSession, res: NextApiResponse, next: Function) => {
    const session = await getSession({ req });

    if (session) {
      req.session = session;
    }

    next();
  }
);

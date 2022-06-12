import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import nc from 'next-connect';

export interface TestInterface extends NextApiRequest {
  session: DefaultSession | null;
}

export const handler = nc<NextApiRequest, NextApiResponse>().use(
  async (req: TestInterface, res: NextApiResponse, next: Function) => {
    const session = await getSession({ req });

    if (session) {
      req.session = session;
    }

    next();
  }
);

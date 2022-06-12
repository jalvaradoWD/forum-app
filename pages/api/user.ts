import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const session = await getSession({ req });

  res.json(session);
});

handler.post(async (req, res) => {
  const session = await getSession({ req });
  res.json({
    session,
    info: {
      stats: 200,
      message: 'This is the post route for the user API route',
    },
  });
});

export default handler;

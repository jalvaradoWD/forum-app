import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const topicId: string = req.query.id as string;

  const foundTopic = await prisma?.topic.findFirst({
    where: { id: topicId },
    include: {
      author: { select: { email: true, image: true, id: true } },
      Comment: {
        include: {
          author: {
            select: { email: true, id: true, image: true, name: true },
          },
        },
      },
    },
  });

  return res.status(200).json(foundTopic);
});

export default handler;

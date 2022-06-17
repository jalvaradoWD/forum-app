import {
  handler,
  TestInterface,
  authenticateUserMiddleware,
} from '../../lib/auth';
import { prisma } from '../../lib/db';

handler.get<TestInterface>(authenticateUserMiddleware, async (req, res) => {
  const userEmail = req.session?.user?.email;
  const foundUser = await prisma.user.findFirst({
    where: { email: userEmail },
  });
  if (!foundUser) return res.status(400).json({ message: 'User not found' });
  return res.json(foundUser);
});

export default handler;

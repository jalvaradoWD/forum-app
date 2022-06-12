import { handler, TestInterface } from '../../lib/auth';
import { prisma } from '../../lib/db';

handler.get<TestInterface>(async (req, res) => {
  const userEmail = req.session?.user?.email;
  if (!userEmail) return res.status(400).json({ message: 'Not authenticated' });
  const foundUser = await prisma.user.findFirst({
    where: {},
  });
  console.log(foundUser, userEmail);
  res.json(123);
});

export default handler;

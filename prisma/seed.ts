import { PrismaClient } from '@prisma/client';
import { generateFakeUser } from '../lib/seedFunctions';

const prismaClient = new PrismaClient();

async function main() {
  const generatedUsers = await generateFakeUser(100);

  const addedUsers = await prismaClient.user.createMany({
    data: generatedUsers,
  });

  console.log(`Generated ${addedUsers.count} users.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });

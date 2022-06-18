import { PrismaClient } from '@prisma/client';
import { generateFakeUser, updateUsersTopics } from '../lib/seedFunctions';

const prismaClient = new PrismaClient();

async function main() {
  const generatedUsers = await generateFakeUser(20);

  await prismaClient.user.createMany({
    data: generatedUsers,
  });

  await prismaClient.forum.createMany({
    data: [
      {
        name: 'S&box',
        description:
          'Based on the Source 2 engine and is currently in heavy development.',
      },
      {
        name: 'Rust',
        description: 'Help and discussion on our hugely popular survival game.',
      },
      {
        name: "Garry's Mod",
        description:
          'Help and discussion surrounding our Source Engine 1 based sandbox game',
      },
    ],
  });

  const forums = await prismaClient.forum.findMany({});
  const topics = await prismaClient.topic.findMany({});
  const category = await prismaClient.category.findMany({});
  const users = await prisma?.user.findMany({});

  forums.forEach(async (forum) => {
    await prismaClient?.category.createMany({
      data: [
        {
          forum: forum.id,
          name: 'general',
        },
        {
          forum: forum.id,
          name: 'coding',
        },
        {
          forum: forum.id,
          name: 'mapping',
        },
        {
          forum: forum.id,
          name: 'modeling',
        },
        {
          forum: forum.id,
          name: 'help & support',
        },
        {
          forum: forum.id,
          name: 'suggestions & feedback',
        },
      ],
    });
  });

  // users?.forEach((user) => {
  //   updateUsersTopics(topics, user);
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });

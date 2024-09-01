import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('123123123', 12);
  const user = await prisma.user.create({
    data: {
      username: '123',
      passwordHash,
    },
  });

  const authorId = user.id;

  const submissions = [
    { text: 'Welcome to Typey!', title: 'title1', authorId },
    {
      text: 'I can navigate backwards, forwards, and reset.',
      title: 'title2',
      authorId,
    },
    { text: 'Can easily link to a passage!', title: 'title3', authorId },
    {
      text: 'If I get things right, it all appears green.',
      title: 'title4',
      authorId,
    },
    {
      text: 'If things go wrong, it highlights red.',
      title: 'title5',
      authorId,
    },
    {
      text: 'If I get it wrong, and not notice, I can no longer type.',
      title: 'title6',
      authorId,
    },
    { text: 'Emojis 👏 also 👏 work', title: 'title7', authorId },
    { text: 'What am I missing?', title: 'title8', authorId },
    {
      text: 'No users, no user passage submission, no high scores, no keyboard shortcuts.',
      title: 'title9',
      authorId,
    },
    {
      text: 'life without call course know never old head one good since off develop no present large off interest before want from you fact ask help move',
      title: 'title10',
      authorId,
    },
  ];

  const passages = await prisma.passage.createMany({
    data: submissions.map((entry) => {
      return entry;
    }),
  });

  console.log(passages);
}
main().then(async () => {
  await prisma.$disconnect().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
});

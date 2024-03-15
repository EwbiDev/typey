import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const texts = [
    'Welcome to Typey!',
    'I can navigate backwards, forwards, and reset.',
    'Can easily link to a passage!',
    'If I get things right, it all appears green.',
    'If things go wrong, it highlights red.',
    'If I get it wrong, and not notice, I can no longer type.',
    'Emojis 👏 also 👏 work',
    'What am I missing?',
    'No users, no user passage submission, no high scores, no keyboard shortcuts.',
    'life without call course know never old head one good since off develop no present large off interest before want from you fact ask help move',
  ];

  const passages = await prisma.passage.createMany({
    data: texts.map((text) => {
      return { text };
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

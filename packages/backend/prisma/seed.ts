import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const texts = [
    'Welcome to Typey!',
    'If I get things right, it all appears green.',
    'I can navigate backwards, forwards, and reset.',
    'If things go wrong, it highlights red.',
    'If I get it wrong, and not notice, I can no longer type.',
    'Emojis 👏 also 👏 work',
    'Can easily link to a passage!',
    'What am I missing?',
    'No users, no user passage submission, no high scores, no keyboard shortcuts',
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

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const texts = [
    'some text for testing typing',
    'typing some other things also for testing',
  ];

  texts.forEach(async (text) => {
    const passage = await prisma.passage.create({
      data: {
        text,
      },
    });

    console.log(passage);
  });
}
main().then(async () => {
  await prisma.$disconnect().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
});

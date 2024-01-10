import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {


  const user = await prisma.user.create({
    data: {
      email: "user2@userhausen.de",
      firstName: "Harry",
      lastName: "Schnodder",
      userName: "Narbengesicht69",
      password: "123456",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user1@userhausen.de",
      firstName: "Albert",
      lastName: "Doubledoor",
      userName: "freshDumble",
      password: "123456",
    },
  });

  await prisma.point.create({
    data: {
      timePlayed: 120,
      score: 120,
      userId: user.id
    },
  });

  await prisma.point.create({
    data: {
      timePlayed: 60,
      score: 100,
      userId: user.id
    },
  });

  await prisma.point.create({
    data: {
      timePlayed: 23,
      score: 100000,
      userId: user2.id
    },
  });

  await prisma.point.create({
    data: {
      timePlayed: 80,
      score: 101,
      userId: user2.id
    },
  });

}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

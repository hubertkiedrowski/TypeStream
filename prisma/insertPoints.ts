import { Point, PrismaClient, User } from "@prisma/client";
import { Points } from "../src/components/fetchedUserdata";

const prisma = new PrismaClient();
async function main() {
  const createUser = async ({
    email,
    firstName,
    lastName,
    userName,
    password,
  }: User) => {
    return await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        userName,
        password,
      },
    });
  };

  const createPoint = async ({ timePlayed, score, userId }: Point) => {
    return await prisma.point.create({
      data: {
        timePlayed,
        score,
        userId,
      },
    });
  };
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

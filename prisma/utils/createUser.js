import { PrismaClient, User, Point } from "@prisma/client";
//TODO hier die funktion zum anlegen
export async function createUser({
  email,
  firstName,
  lastName,
  userName,
  password,
}) {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        userName,
        password,
      },
    });
    await prisma.$disconnect();
    return user;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    throw error;
  }
}

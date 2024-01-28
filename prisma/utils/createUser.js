import { PrismaClient } from "@prisma/client";
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
    console.log("punkt angelegt");
    await prisma.$disconnect();
    return user;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    throw error;
  }
}
export default createUser;

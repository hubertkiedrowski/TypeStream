import { PrismaClient, User, Point } from "@prisma/client";

export async function createPoint({ timePlayed, score, userId }) {
  const prisma = new PrismaClient();
  try {
    const point = await prisma.point.create({
      data: {
        timePlayed,
        score,
        userId,
      },
    });
    await prisma.$disconnect();
    return point;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    throw error;
  }
}

export default createPoint;

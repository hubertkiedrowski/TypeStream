import { PrismaClient } from "@prisma/client";

export async function createPoint({ timePlayed, score, userId }) {
  const prisma = new PrismaClient();
  try {
    if (
      (timePlayed === undefined) |
      (score === undefined) |
      (userId === undefined)
    ) {
      throw new Error("something is undefined");
    }
    const point = await prisma.point.create({
      data: {
        timePlayed,
        score,
        userId,
      },
    });
    await prisma.$disconnect();
    console.log("punkt angelegt");
    return point;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    throw error;
  }
}

export default createPoint;

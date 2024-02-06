import { PrismaClient } from "@prisma/client";

/**
 * Creates a new point record in the database.
 * @param {number} score - The score value for the point.
 * @param {number} userId - The ID of the user associated with the point.
 * @param {number} timePlayed - The time played value.
 * @returns {Promise<object>} - The created point object.
 * @throws {Error} - If any of the required parameters are undefined.
 */
export async function createPoint(score, userId, timePlayed) {
  const prisma = new PrismaClient();
  try {
    console.log("createPoint:", score, userId, timePlayed);
    if (score == undefined || userId == undefined || timePlayed == undefined) {
      throw new Error(`score${score} userid ${userId} userid ${timePlayed}`);
    }
    const point = await prisma.point.create({
      data: {
        score,
        userId,
        timePlayed,
      },
    });
    console.log("createPoint succesfull:", score, userId, timePlayed);
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

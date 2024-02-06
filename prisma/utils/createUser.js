import { PrismaClient } from "@prisma/client";

/**
 * Creates a new user in the database.
 * @param {Object} userData - The user data.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.firstName - The first name of the user.
 * @param {string} userData.lastName - The last name of the user.
 * @param {string} userData.userName - The username of the user.
 * @param {string} userData.password - The password of the user.
 * @throws {Error} - If there is an error creating the user.
 */
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

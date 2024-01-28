import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const createUser = async (email, firstName, lastName, userName, password) => {
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

  const createPoint = async (timePlayed, score, userId) => {
    return await prisma.point.create({
      data: {
        timePlayed,
        score,
        userId,
      },
    });
  };

  const user = await createUser(
    "user@softwareEngeneering.de",
    "admini",
    "strator",
    "IKnowYourPassword",
    "$2a$10$PrkGZhUYCu6guZNqdUWUQOOtZ4w9pS2zEfRbv4u.fC4Flthps0rua"
  );
  await createPoint(80, 101, user.id);
  await createPoint(801, 1011, user.id);

  const user2 = await createUser(
    "user2@softwareEngeneering.de",
    "Albert",
    "Doubledoor",
    "freshDumble",
    "$2a$10$PrkGZhUYCu6guZNqdUWUQOOtZ4w9pS2zEfRbv4u.fC4Flthps0rua"
  );
  await createPoint(4226, 5236, user2.id);
  await createPoint(8567, 9764, user2.id);

  const user3 = await createUser(
    "user3@softwareEngeneering.de",
    "Hans",
    "Peterson",
    "hansi",
    "$2a$10$PrkGZhUYCu6guZNqdUWUQOOtZ4w9pS2zEfRbv4u.fC4Flthps0rua"
  );
  await createPoint(1234, 5437, user3.id);
  await createPoint(4456, 6334, user3.id);

  const user4 = await createUser(
    "user4@softwareEngeneering.de",
    "Max",
    "Mustermann",
    "MaxMustermänn",
    "$2a$10$PrkGZhUYCu6guZNqdUWUQOOtZ4w9pS2zEfRbv4u.fC4Flthps0rua"
  );
  await createPoint(1235, 7834, user4.id);
  await createPoint(7753, 4238, user4.id);

  const user5 = await createUser(
    "user5@softwareEngeneering.de",
    "Magnus",
    "Brix",
    "HerrBrix",
    "$2a$10$PrkGZhUYCu6guZNqdUWUQOOtZ4w9pS2zEfRbv4u.fC4Flthps0rua"
  );
  await createPoint(4200, 2347, user5.id);
  await createPoint(8762, 7457, user5.id);
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

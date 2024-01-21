/*
  Warnings:

  - You are about to drop the column `challenge` on the `Point` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Point" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timePlayed" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Point_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Point" ("createdAt", "id", "score", "timePlayed", "userId") SELECT "createdAt", "id", "score", "timePlayed", "userId" FROM "Point";
DROP TABLE "Point";
ALTER TABLE "new_Point" RENAME TO "Point";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

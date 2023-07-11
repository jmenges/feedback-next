/*
  Warnings:

  - You are about to drop the column `upvotes` on the `Feedback` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Upvotes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "feedbackId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Upvotes_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Upvotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'suggestion',
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Feedback_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Feedback" ("authorId", "category", "description", "id", "status", "title") SELECT "authorId", "category", "description", "id", "status", "title" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

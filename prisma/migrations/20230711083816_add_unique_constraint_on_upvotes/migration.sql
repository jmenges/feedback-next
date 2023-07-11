/*
  Warnings:

  - You are about to drop the `Upvote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Upvote";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "upvotes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "feedbackId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "upvotes_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "upvotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "upvotes_feedbackId_idx" ON "upvotes"("feedbackId");

-- CreateIndex
CREATE INDEX "upvotes_userId_idx" ON "upvotes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "upvotes_userId_feedbackId_key" ON "upvotes"("userId", "feedbackId");

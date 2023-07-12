-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_upvotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "feedbackId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "upvotes_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "upvotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_upvotes" ("feedbackId", "id", "userId") SELECT "feedbackId", "id", "userId" FROM "upvotes";
DROP TABLE "upvotes";
ALTER TABLE "new_upvotes" RENAME TO "upvotes";
CREATE INDEX "upvotes_feedbackId_idx" ON "upvotes"("feedbackId");
CREATE INDEX "upvotes_userId_idx" ON "upvotes"("userId");
CREATE UNIQUE INDEX "upvotes_userId_feedbackId_key" ON "upvotes"("userId", "feedbackId");
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "replyingToUserId" TEXT,
    "replyingToCommentId" TEXT,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Comment_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_replyingToUserId_fkey" FOREIGN KEY ("replyingToUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_replyingToCommentId_fkey" FOREIGN KEY ("replyingToCommentId") REFERENCES "Comment" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("authorId", "content", "feedbackId", "id", "replyingToCommentId", "replyingToUserId") SELECT "authorId", "content", "feedbackId", "id", "replyingToCommentId", "replyingToUserId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

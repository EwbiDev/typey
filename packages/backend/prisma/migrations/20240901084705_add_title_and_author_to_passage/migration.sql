/*
  Warnings:

  - Added the required column `authorId` to the `Passage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Passage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Passage" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Passage" ADD CONSTRAINT "Passage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

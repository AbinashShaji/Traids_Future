/*
  Warnings:

  - You are about to drop the column `result` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "authorName" TEXT,
ADD COLUMN     "authorRole" TEXT,
ADD COLUMN     "readingTime" INTEGER,
ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "result",
ADD COLUMN     "results" JSONB,
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "testimonialId" TEXT;

/*
  Warnings:

  - You are about to drop the column `adress` on the `Professional` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Professional" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT;

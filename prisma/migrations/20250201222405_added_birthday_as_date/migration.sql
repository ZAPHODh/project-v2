/*
  Warnings:

  - The `birthDay` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "birthDay",
ADD COLUMN     "birthDay" TIMESTAMP(3);

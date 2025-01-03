/*
  Warnings:

  - Added the required column `categroy` to the `Professional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Professional" ADD COLUMN     "adress" TEXT,
ADD COLUMN     "categroy" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profile" TEXT;

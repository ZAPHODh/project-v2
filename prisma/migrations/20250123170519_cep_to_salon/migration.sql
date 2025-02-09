/*
  Warnings:

  - Added the required column `cep` to the `Salon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Salon" ADD COLUMN     "cep" TEXT NOT NULL;

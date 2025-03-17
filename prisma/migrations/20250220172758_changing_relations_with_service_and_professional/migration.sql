/*
  Warnings:

  - You are about to drop the `_ProfessionalServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProfessionalServices" DROP CONSTRAINT "_ProfessionalServices_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessionalServices" DROP CONSTRAINT "_ProfessionalServices_B_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "professionalId" TEXT;

-- DropTable
DROP TABLE "_ProfessionalServices";

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

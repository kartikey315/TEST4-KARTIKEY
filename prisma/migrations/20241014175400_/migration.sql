/*
  Warnings:

  - The primary key for the `BioMetricPassKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BioMetricPassKey` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BioMetricPassKey" DROP CONSTRAINT "BioMetricPassKey_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BioMetricPassKey_pkey" PRIMARY KEY ("credentialid");

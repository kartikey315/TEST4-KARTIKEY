/*
  Warnings:

  - You are about to drop the column `lastRequestedOTP` on the `User` table. All the data in the column will be lost.
  - Added the required column `referralCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastRequestedOTP",
ADD COLUMN     "referralCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BioMetricPassKey" (
    "id" TEXT NOT NULL,
    "webAuthnUserID" TEXT NOT NULL,
    "credentialid" BYTEA NOT NULL,
    "publicKey" BYTEA NOT NULL,
    "counter" INTEGER NOT NULL,
    "deviceType" TEXT NOT NULL,
    "backedUp" BOOLEAN NOT NULL,
    "transports" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "BioMetricPassKey_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BioMetricPassKey" ADD CONSTRAINT "BioMetricPassKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

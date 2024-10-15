/*
  Warnings:

  - A unique constraint covering the columns `[passcode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_passcode_key" ON "User"("passcode");

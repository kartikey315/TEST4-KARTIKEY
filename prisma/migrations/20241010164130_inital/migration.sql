-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "lastRequestedOTP" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_updated" TIMESTAMP(3),
ADD COLUMN     "user_created" TEXT,
ADD COLUMN     "user_updated" TEXT;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_updated" TIMESTAMP(3),
ADD COLUMN     "user_created" TEXT,
ADD COLUMN     "user_updated" TEXT;

-- AlterTable
ALTER TABLE "logs" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_updated" TIMESTAMP(3),
ADD COLUMN     "user_created" TEXT,
ADD COLUMN     "user_updated" TEXT;

-- AlterTable
ALTER TABLE "results" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_updated" TIMESTAMP(3),
ADD COLUMN     "user_created" TEXT,
ADD COLUMN     "user_updated" TEXT;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_updated" TIMESTAMP(3),
ADD COLUMN     "user_created" TEXT,
ADD COLUMN     "user_updated" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_updated" TIMESTAMP(3),
ADD COLUMN     "is_connected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "session_token" TEXT,
ADD COLUMN     "user_created" TEXT,
ADD COLUMN     "user_updated" TEXT;

-- AlterTable
ALTER TABLE "users_appointments" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_updated" TIMESTAMP(3),
ADD COLUMN     "user_created" TEXT,
ADD COLUMN     "user_updated" TEXT;

-- AlterTable
ALTER TABLE "users_courses" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_updated" TIMESTAMP(3),
ADD COLUMN     "user_created" TEXT,
ADD COLUMN     "user_updated" TEXT;

-- AlterTable
ALTER TABLE "users_roles" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_updated" TIMESTAMP(3),
ADD COLUMN     "user_created" TEXT,
ADD COLUMN     "user_updated" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

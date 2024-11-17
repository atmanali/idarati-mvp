/*
  Warnings:

  - You are about to drop the column `date_created` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `user_created` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `user_created` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `user_created` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `results` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `results` table. All the data in the column will be lost.
  - You are about to drop the column `user_created` on the `results` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated` on the `results` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `user_created` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_created` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `users_appointments` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `users_appointments` table. All the data in the column will be lost.
  - You are about to drop the column `user_created` on the `users_appointments` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated` on the `users_appointments` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `users_courses` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `users_courses` table. All the data in the column will be lost.
  - You are about to drop the column `user_created` on the `users_courses` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated` on the `users_courses` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `users_roles` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `users_roles` table. All the data in the column will be lost.
  - You are about to drop the column `user_created` on the `users_roles` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated` on the `users_roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "date_created",
DROP COLUMN "date_updated",
DROP COLUMN "user_created",
DROP COLUMN "user_updated";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "date_created",
DROP COLUMN "date_updated",
DROP COLUMN "user_created",
DROP COLUMN "user_updated";

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "date_created",
DROP COLUMN "date_updated",
DROP COLUMN "user_created",
DROP COLUMN "user_updated";

-- AlterTable
ALTER TABLE "results" DROP COLUMN "date_created",
DROP COLUMN "date_updated",
DROP COLUMN "user_created",
DROP COLUMN "user_updated";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "date_created",
DROP COLUMN "date_updated",
DROP COLUMN "user_created",
DROP COLUMN "user_updated";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "date_created",
DROP COLUMN "date_updated",
DROP COLUMN "user_created",
DROP COLUMN "user_updated";

-- AlterTable
ALTER TABLE "users_appointments" DROP COLUMN "date_created",
DROP COLUMN "date_updated",
DROP COLUMN "user_created",
DROP COLUMN "user_updated";

-- AlterTable
ALTER TABLE "users_courses" DROP COLUMN "date_created",
DROP COLUMN "date_updated",
DROP COLUMN "user_created",
DROP COLUMN "user_updated";

-- AlterTable
ALTER TABLE "users_roles" DROP COLUMN "date_created",
DROP COLUMN "date_updated",
DROP COLUMN "user_created",
DROP COLUMN "user_updated";

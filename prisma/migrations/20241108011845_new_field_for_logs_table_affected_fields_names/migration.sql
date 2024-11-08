/*
  Warnings:

  - Added the required column `affected_fields_names` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logs" ADD COLUMN     "affected_fields_names" TEXT NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

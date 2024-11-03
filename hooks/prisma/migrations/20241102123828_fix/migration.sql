/*
  Warnings:

  - You are about to drop the `ZapRunOutbox` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ZapRunOutbox" DROP CONSTRAINT "ZapRunOutbox_zapRunId_fkey";

-- DropTable
DROP TABLE "ZapRunOutbox";

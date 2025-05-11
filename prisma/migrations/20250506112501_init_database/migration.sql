/*
  Warnings:

  - You are about to alter the column `gender` on the `member` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `VarChar(9)`.

*/
-- AlterTable
ALTER TABLE `member` MODIFY `gender` VARCHAR(9) NULL;

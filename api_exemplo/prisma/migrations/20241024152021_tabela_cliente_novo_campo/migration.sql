/*
  Warnings:

  - You are about to drop the column `resetToken` on the `clientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clientes` DROP COLUMN `resetToken`,
    ADD COLUMN `novaSenha` VARCHAR(191) NULL;

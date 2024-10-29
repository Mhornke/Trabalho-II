/*
  Warnings:

  - You are about to alter the column `clienteId` on the `avaliacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - The primary key for the `clientes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `clientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - You are about to alter the column `clienteId` on the `ordens_de_compra` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `avaliacao` DROP FOREIGN KEY `Avaliacao_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `ordens_de_compra` DROP FOREIGN KEY `ordens_de_compra_clienteId_fkey`;

-- AlterTable
ALTER TABLE `avaliacao` MODIFY `clienteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `clientes` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ordens_de_compra` MODIFY `clienteId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Avaliacao` ADD CONSTRAINT `Avaliacao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordens_de_compra` ADD CONSTRAINT `ordens_de_compra_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

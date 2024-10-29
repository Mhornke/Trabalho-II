/*
  Warnings:

  - The primary key for the `clientes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `avaliacao` DROP FOREIGN KEY `Avaliacao_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `ordens_de_compra` DROP FOREIGN KEY `ordens_de_compra_clienteId_fkey`;

-- AlterTable
ALTER TABLE `avaliacao` MODIFY `clienteId` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `clientes` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ordens_de_compra` MODIFY `clienteId` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `Avaliacao` ADD CONSTRAINT `Avaliacao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordens_de_compra` ADD CONSTRAINT `ordens_de_compra_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

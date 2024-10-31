/*
  Warnings:

  - You are about to drop the `ordens_de_compra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ordens_de_compra` DROP FOREIGN KEY `ordens_de_compra_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `ordens_de_compra` DROP FOREIGN KEY `ordens_de_compra_ferramentaId_fkey`;

-- DropTable
DROP TABLE `ordens_de_compra`;

-- CreateTable
CREATE TABLE `favoritos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` VARCHAR(36) NOT NULL,
    `ferramentaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_ferramentaId_fkey` FOREIGN KEY (`ferramentaId`) REFERENCES `ferramentas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

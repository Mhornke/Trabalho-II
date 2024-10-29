-- CreateTable
CREATE TABLE `Avaliacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalAvaliacao` INTEGER NOT NULL,
    `estrelas` INTEGER NOT NULL DEFAULT 0,
    `comentario` VARCHAR(255) NULL,
    `ferramentaId` INTEGER NOT NULL,
    `clienteId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Avaliacao` ADD CONSTRAINT `Avaliacao_ferramentaId_fkey` FOREIGN KEY (`ferramentaId`) REFERENCES `ferramentas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avaliacao` ADD CONSTRAINT `Avaliacao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

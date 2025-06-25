-- CreateTable
CREATE TABLE `projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pj_id` VARCHAR(7) NOT NULL,
    `pj_name` VARCHAR(255) NOT NULL,
    `pj_member_id` INTEGER NOT NULL,
    `company` VARCHAR(255) NOT NULL,
    `created_by` VARCHAR(45) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_by` VARCHAR(45) NULL,
    `updated_at` TIMESTAMP(6) NOT NULL,
    `deleted_by` VARCHAR(45) NULL,
    `deleted_at` TIMESTAMP(6) NULL,

    UNIQUE INDEX `projects_pj_id_key`(`pj_id`),
    INDEX `project_deleted_at_idx`(`deleted_at`),
    INDEX `projects_pj_member_id_fkey`(`pj_member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pj_members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` VARCHAR(7) NOT NULL,
    `member_type` VARCHAR(45) NOT NULL,
    `created_by` VARCHAR(45) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_by` VARCHAR(45) NULL,
    `updated_at` TIMESTAMP(6) NOT NULL,
    `deleted_by` VARCHAR(45) NULL,
    `deleted_at` TIMESTAMP(6) NULL,

    UNIQUE INDEX `pj_members_member_id_key`(`member_id`),
    INDEX `pj_member_deleted_at_idx`(`deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,
    `deleted_at` TIMESTAMP(6) NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    INDEX `deleted_at_index`(`deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupId` VARCHAR(7) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `system_type` VARCHAR(25) NULL,
    `description` VARCHAR(255) NULL,
    `permission` JSON NULL,
    `created_by` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_by` VARCHAR(255) NULL,
    `updated_at` TIMESTAMP(6) NOT NULL,
    `deleted_by` VARCHAR(255) NULL,
    `deleted_at` TIMESTAMP(6) NULL,

    UNIQUE INDEX `user_groups_groupId_key`(`groupId`),
    INDEX `user_group_deleted_at_idx`(`deleted_at`),
    INDEX `user_group_system_type_idx`(`system_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(7) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(16) NULL,
    `password` VARCHAR(255) NOT NULL,
    `pj_member_id` INTEGER NOT NULL,
    `user_group_id` INTEGER NULL,
    `department` VARCHAR(45) NULL,
    `project_id` INTEGER NULL,
    `created_by` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `User_user_id_key`(`user_id`),
    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_pj_member_id_fkey`(`pj_member_id`),
    INDEX `User_project_id_fkey`(`project_id`),
    INDEX `User_role_id_fkey`(`role_id`),
    INDEX `User_user_group_id_fkey`(`user_group_id`),
    INDEX `email_index`(`email`),
    INDEX `user_id_index`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_pj_member_id_fkey` FOREIGN KEY (`pj_member_id`) REFERENCES `pj_members`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_pj_member_id_fkey` FOREIGN KEY (`pj_member_id`) REFERENCES `pj_members`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_user_group_id_fkey` FOREIGN KEY (`user_group_id`) REFERENCES `user_groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

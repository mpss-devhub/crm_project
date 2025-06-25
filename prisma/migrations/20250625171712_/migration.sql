-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_user_group_id_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `user_group_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_user_group_id_fkey` FOREIGN KEY (`user_group_id`) REFERENCES `user_groups`(`groupId`) ON DELETE SET NULL ON UPDATE CASCADE;

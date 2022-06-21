/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `forum` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_category_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description",
ADD COLUMN     "forum" TEXT NOT NULL;

-- DropTable
DROP TABLE "SubCategory";

-- CreateTable
CREATE TABLE "Forum" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_forum_fkey" FOREIGN KEY ("forum") REFERENCES "Forum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

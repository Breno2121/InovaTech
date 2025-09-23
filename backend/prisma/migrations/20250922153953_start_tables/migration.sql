/*
  Warnings:

  - The primary key for the `chamado` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."chamado" DROP CONSTRAINT "chamado_pkey",
ADD CONSTRAINT "chamado_pkey" PRIMARY KEY ("id");

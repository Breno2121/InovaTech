-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chamado" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "manutencao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chamado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comentario" (
    "id" TEXT NOT NULL,
    "chamadoId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "emailClient" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "public"."client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_cpf_key" ON "public"."client"("cpf");

-- AddForeignKey
ALTER TABLE "public"."chamado" ADD CONSTRAINT "chamado_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."client"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comentario" ADD CONSTRAINT "comentario_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "public"."chamado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comentario" ADD CONSTRAINT "comentario_emailClient_fkey" FOREIGN KEY ("emailClient") REFERENCES "public"."client"("email") ON DELETE CASCADE ON UPDATE CASCADE;

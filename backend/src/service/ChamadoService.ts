import { Chamado } from "@prisma/client";
import { prisma } from "../prisma/client";

class ChamadoService {
  public async register({
    titulo,
    descricao,
    status,
    email,
    manutencao
  }: CreateChamadoType): Promise<void> {

    const chamado: Chamado = {
      id: crypto.randomUUID(),
      titulo: titulo,
      descricao: descricao,
      status: status,
      email: email,
      manutencao: manutencao,
      createdAt: new Date()
    };
    await prisma.chamado.create({
      data: chamado,
    });
  }

  public async getAllChamados() {
    const chamados = await prisma.chamado.findMany({
      include: {
        client: true,
      },
    });
    return chamados;
  }

  public async getChamadoId(id: string) {
    const chamados = await prisma.chamado.findUnique({ where: { id } });
    return chamados;
  }

  public async updateStatusChamado(id: string, status: string) {
    const chamado = await prisma.chamado.update({
      where: { id },
      data: {
        status: status,
      },
    });
    return chamado;
  }
}

export const chamadoService = new ChamadoService();

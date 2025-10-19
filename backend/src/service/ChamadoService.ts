import { Chamado } from "@prisma/client";
import { prisma } from "../prisma/client";

class ChamadoService {
    public async register({ titulo, descricao, status, clientId, manutencao }: CreateChamadoType): Promise<void> {
        
      const chamado: Chamado = {
        id: crypto.randomUUID(),
        titulo,
        descricao,
        status,
        clientId,
        manutencao,
        createdAt: new Date()
      };
    
      await prisma.chamado.create({
        data: chamado
      });
    }

    public async getAllChamados() {
        const chamados = await prisma.chamado.findMany({
            include: {
                    client: true 
                }
        });
        return chamados;
    }

public async getChamadoId(id: string) {
        const chamados = await prisma.chamado.findUnique({ where :{ id } })
        return chamados
    }
}

export const chamadoService = new ChamadoService();
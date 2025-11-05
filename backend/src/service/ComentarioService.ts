import { Comentario } from "@prisma/client";
import { prisma } from "../prisma/client";

class ComentarioService {
    public async registerComentario({ chamadoId, content, emailClient, created_at, updated_at }: CreateComentarioType): Promise<void> {
        const comentario: Comentario = {
            id: crypto.randomUUID(),
            chamadoId,
            content,
            emailClient,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await prisma.comentario.create({
            data: comentario
        });
    }
    public async getAllComentarios(chamadoId: string) {
        const comentarios = await prisma.comentario.findMany({ where: { chamadoId } });
        return comentarios;
    }

    // public async getComentarioId(chamadoId: string) {
    //     const comentario = await prisma.comentario.findMany({ where: { chamadoId } })
    //     return comentario
    // }
    
    public async deleteComentarioId(id: string) {
        return await prisma.comentario.delete({ where: { id } })
    }
}


export const comentarioService = new ComentarioService();
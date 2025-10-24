import { Comentario } from "@prisma/client";
import { prisma } from "../prisma/client";

class ComentarioService {
    public async registerComentario({ chamadoId, content, clientId, created_at, updated_at }: CreateComentarioType): Promise<void> {
        const comentario: Comentario = {
            id: crypto.randomUUID(),
            chamadoId,
            content,
            clientId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await prisma.comentario.create({
            data: comentario
        });
    }
    public async getAllComentarios() {
        const comentarios = await prisma.comentario.findMany({
            include: {
                client: true
            }
        });
        return comentarios;
    }

    public async getComentarioId(id: string) {
        const comentario = await prisma.comentario.findUnique({ where: { id } })
        return comentario
    }
}


export const comentarioService = new ComentarioService();
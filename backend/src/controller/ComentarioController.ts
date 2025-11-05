import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { comentarioService } from "../service/ComentarioService";


export async function comentarioController(app: FastifyInstance) {
    app.post("/comentario/register", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateComentarioType;

        console.log("Body recebido:", body)
        try {
            await comentarioService.registerComentario(body);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

    //Rota de buscar todos os comentario de um chamado especifico
    app.get("/comentario/getAll/:chamadoId", async (request: FastifyRequest, reply: FastifyReply) => {
        const { chamadoId } = request.params as { chamadoId: string };
        try {
            const comentarios = await comentarioService.getAllComentarios(chamadoId);
            return reply.code(200).send(comentarios);
        } catch (error: any) {
            return reply.code(401).send({ erro: error.message })
        }
    })

    // app.get("/comentario/busca/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    //     const { id } = request.params as { id: string }
    //     try {
    //         const comentario = await comentarioService.getComentarioId(id);
    //         return reply.code(200).send(comentario);
    //     } catch (error: any) {
    //         return reply.code(401).send({ erro: error.message })
    //     }
    // })

    app.delete("/comentario/delete/:id", async (request: FastifyRequest, reply: FastifyReply) => {
            const { id } = request.params as { id: string }
    
            try {
                await comentarioService.deleteComentarioId(id)
                return reply.code(200).send("Comentario excluido com sucesso!")
            } catch (error: any) {
                console.log("erro ao excluir comentario: ", error)
                return reply.code(500).send({erro: error.message})
            }
        })
}
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { comentarioService } from "../service/ComentarioService";


export async function comentarioController(app: FastifyInstance) {
    app.post("/comentario/register", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateComentarioType;

        console.log("Body recebido:", request)
        try {
            await comentarioService.registerComentario(body);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

    app.get("/comentario/busca", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const comentarios = await comentarioService.getAllComentarios();
            return reply.code(200).send(comentarios);
        } catch (error: any) {
            return reply.code(401).send({ erro: error.message })
        }
    })

    app.get("/comentario/busca/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string }
        try {
            const comentario = await comentarioService.getComentarioId(id);
            return reply.code(200).send(comentario);
        } catch (error: any) {
            return reply.code(401).send({ erro: error.message })
        }
    })
}
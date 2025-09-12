import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { chamadoService } from "../service/ChamadoService";



export async function chamadoController(app: FastifyInstance) {
    app.post("/chamado/register", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateChamadoType;

        try {
            await chamadoService.register(body)
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

    app.get("/chamado/busca", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const chamados = await chamadoService.getAllChamados();
            return reply.code(200).send(chamados);
        } catch (error: any) {
            return reply.code(401).send({ erro: error.message })
        }
    })
}

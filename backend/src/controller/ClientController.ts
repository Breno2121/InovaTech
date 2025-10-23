import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { clientService } from "../service/ClientService";

export function clientController(app: FastifyInstance) {
    app.post("/cliente/register", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateClientType;

        try {
            await clientService.register(body)
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({erro: error.message})
        }
    })
    
    app.get("/cliente/busca", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const clients = await clientService.getAllClient();
            return reply.code(200).send(clients)
        } catch (error: any) {
            return reply.code(401).send({ erro: error.message })
        }
    })

    app.get("/cliente/busca/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string }
        try {
            const client = await clientService.getClientId(id);
            return reply.code(200).send(client);
        } catch (error: any) {
            return reply.code(401).send({ erro: error.message })
        }
    })

    app.patch("/cliente/update/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string }
        const { name, email, cpf, phone } = request.body as CreateClientType

        try {
            const client = await clientService.updateClientId(id, name, email, cpf, phone);
            return reply.code(200).send(client);
        } catch (error: any) {
            return reply.code(401).send({ erro: error.message })
        }
    })

    app.delete("/cliente/delete/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string }

        try {
            await clientService.deleteClient(id)
            return reply.code(200).send("Cliente excluido com sucesso!")
        } catch (error: any) {
            console.log("erro ao excluir cliente: ", error)
            return reply.code(500).send({erro: error.message})
        }
    })
}
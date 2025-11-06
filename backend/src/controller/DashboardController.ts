import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { dashboardService } from "../service/DashboardService";


export async function dashboardController(app: FastifyInstance) {
  app.get("/dashboard/manutencoes", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const dados = await dashboardService.getGroupManutencoes();
      return reply.code(200).send(dados);
    } catch (error) {
      console.error("Erro ao buscar manutencoes:", error);
      reply.status(500).send({ error: "Erro ao gerar estatísticas" });
    }
  });
}

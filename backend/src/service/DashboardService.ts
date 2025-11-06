import { prisma } from "../prisma/client";

class DashboardService {
  public async getGroupManutencoes() {
    const manutencaoGroup = await prisma.chamado.groupBy({
      by: ["manutencao"],
      _count: {
        manutencao: true,
      },
    });

    return manutencaoGroup.map((item) => ({
      tipo: item.manutencao,
      quantidade: item._count.manutencao,
    }));
  }
}

export const dashboardService = new DashboardService();

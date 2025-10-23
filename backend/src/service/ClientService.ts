import { Client } from "@prisma/client";
import { prisma } from "../prisma/client";

class ClientService {
    public async register({name, email, cpf, phone}: CreateClientType): Promise<void> {
        const client: Client = {
            id: crypto.randomUUID(),
            name: name,
            email: email,
            cpf: cpf,
            phone: phone
        };

        await prisma.client.create({
            data: client
        });
    }

    public async getAllClient() {
        const client = await prisma.client.findMany({});
        return client;
    }

    public async getClientId(id: string) {
        const client = await prisma.client.findUnique({where: { id }})
        return client
    }

    public async updateClientId(id: string, name: string, email: string, cpf: string, phone: string) {
        const client = await prisma.client.update({
            where: { id },
            data: {
                name: name,
                email: email,
                cpf: cpf,
                phone: phone
            }
        })
        return client
    }

    public async deleteClient(id: string) {
        return await prisma.client.delete({where: { id }})
    }
}

export const clientService = new ClientService();
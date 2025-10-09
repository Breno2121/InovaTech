import { Client } from "@prisma/client";
import { prisma } from "../prisma/client";

class ClientService {
    public async register({name, email}: CreateClientType): Promise<void> {
        const client: Client = {
            id: crypto.randomUUID(),
            name: name,
            email: email
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

    public async updateClientId(id: string, name: string, email: string) {
        const client = await prisma.client.update({
            where: { id },
            data: {
                name: name,
                email: email
            }
        })
        return client
    }

    public async deleteClient(id: string) {
        return await prisma.client.delete({where: { id }})
    }

}

export const clientService = new ClientService();
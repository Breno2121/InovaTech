import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { swaggerConfig } from "./config/swagger";
import { userController } from "./controller/UserController";
import authJwt from "./middleware/authJwt";
import { chamadoController } from "./controller/ChamadoController";
import { clientController } from "./controller/ClientController";
import { comentarioController } from "./controller/ComentarioController";
import { dashboardController } from "./controller/DashboardController";

const app = fastify();

app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
});

app.register(fastifySwagger, swaggerConfig as any);
app.register(fastifySwaggerUi, { routePrefix: '/docs', uiConfig: { docExpansion: 'list' } })

app.register(authJwt)
app.register(userController)
app.register(chamadoController)
app.register(clientController)
app.register(comentarioController)
app.register(dashboardController)

const PORT = 3333;
app.listen({ port: PORT }).then(() => {
    console.log(`Backend rodando na porta ${PORT}!`)
})

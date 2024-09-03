"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const client_1 = require("@prisma/client");
const jwtHelper_1 = require("./helpers/jwtHelper");
const prisma = new client_1.PrismaClient();
const main = async () => {
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 3000 },
        context: async ({ req }) => {
            const verifyToken = (await jwtHelper_1.jwtHelpers.verifyToken(req.headers.authorization));
            return {
                prisma,
                userData: verifyToken,
            };
        },
    });
    console.log(`🚀  Server ready at: ${url}`);
};
main();

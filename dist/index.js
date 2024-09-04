"use strict";
// import { typeDefs } from "./schema";
// import { resolvers } from "./resolvers";
// import { Prisma, PrismaClient } from "@prisma/client";
// import { DefaultArgs } from "@prisma/client/runtime/library";
// import { jwtHelpers } from "./helpers/jwtHelper";
// import cors from "cors";
// import express from "express";
// import { ApolloServer } from "apollo-server-express";
// import { buildSchema } from "type-graphql";
// ______________________________First try
// import { Post } from "./resolvers/Query/post";
// interface Context {
//   prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
//   userData: { userId: number; name: string };
// }
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = handler;
// const prisma = new PrismaClient();
// const main = async () => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 3000 },
//     context: async ({ req }): Promise<Context> => {
//       const verifyToken = (await jwtHelpers.verifyToken(
//         req.headers.authorization
//       )) as { userId: number; name: string };
//       return {
//         prisma,
//         userData: verifyToken,
//       };
//     },
//   });
//   console.log(`🚀  Server ready at: ${url}`);
// };
// main()
// const main = async () => {
//   app.use(cors());
//   const server = new ApolloServer({
//     schema: await buildSchema({
//       validate: false,
//       resolvers: resolvers,
//     }),
//     introspection: false,
//   });
//   server.applyMiddleware({ path: "/graphql", app });
//   app.listen(8080, () => {
//     console.log("server is running");
//   });
// };
// main();
// _____________________________________ Second try
// const main = async () => {
//   const app = express();
//   app.use(cors());
//   const server = new ApolloServer({
//     typeDefs, // Your GraphQL schema
//     resolvers, // Your resolvers object
//     introspection: false,
//   });
//   await server.start();
//   server.applyMiddleware({ app, path: "/graphql" });
//   app.listen(8080, () => {
//     console.log("Server is running on http://localhost:8080/graphql");
//   });
// };
// main();
// _____________________________ Third try
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const client_1 = require("@prisma/client");
const jwtHelper_1 = require("./helpers/jwtHelper");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const port = 3000;
const prisma = new client_1.PrismaClient();
const server = new server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
const app = (0, express_1.default)();
const startServer = async () => {
    await server.start();
    app.use((0, cors_1.default)());
    app.use("/api/graphql", (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            const verifyToken = (await jwtHelper_1.jwtHelpers.verifyToken(req.headers.authorization));
            return {
                prisma,
                userData: verifyToken,
            };
        },
    }));
    return app;
};
const serverApp = startServer();
async function handler(req, res) {
    const app = await serverApp;
    app(req, res);
}
exports.config = {
    api: {
        bodyParser: false,
    },
};
app.get("/", (req, res) => {
    res.send({ message: `server is running well in ${port} port` });
});
app.listen(port, () => {
    console.log(`server is running on port ${3000} he he`);
});

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
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { PrismaClient } from "@prisma/client";
import { jwtHelpers } from "./helpers/jwtHelper";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { env } from "process";
const port = 3000 || process.env;
interface Context {
  prisma: PrismaClient;
  userData: { userId: number; name: string };
}

const prisma = new PrismaClient();

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const app = express();
const startServer = async () => {
  await server.start();

  app.use(cors());

  app.use(
    "/api/graphql",
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => {
        const verifyToken = (await jwtHelpers.verifyToken(
          req.headers.authorization
        )) as { userId: number; name: string };
        return {
          prisma,
          userData: verifyToken,
        };
      },
    })
  );

  return app;
};

const serverApp = startServer();

export default async function handler(req: any, res: any) {
  const app = await serverApp;
  app(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
app.listen(port, () => {
  console.log(`server is running on port ${3000}`);
});

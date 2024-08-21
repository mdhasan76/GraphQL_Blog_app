import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { jwtHelpers } from "./helpers/jwtHelper";

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  user: { userId: number; name: string };
}

const prisma = new PrismaClient();
const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
    context: async ({ req }): Promise<Context> => {
      const verifyToken = (await jwtHelpers.verifyToken(
        req.headers.authorization
      )) as { userId: number; name: string };
      return {
        prisma,
        user: verifyToken,
      };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
};
main();

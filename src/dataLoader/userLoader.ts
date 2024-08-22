import { PrismaClient, User } from "@prisma/client";
import DataLoader from "dataloader";
const prisma = new PrismaClient();

const batchUser = async (ids: number[]): Promise<User[]> => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const userData: { [key: string]: User } = {};
  users.forEach((user) => {
    userData[user.id] = user;
  });
  return ids.map((id) => userData[id]);
};
export const userLoader = new DataLoader<number, User>(batchUser);

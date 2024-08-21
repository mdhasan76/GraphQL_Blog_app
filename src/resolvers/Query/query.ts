export const Query = {
  allUsers: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  posts: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.Post.findMany();
  },
};

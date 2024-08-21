export const User = {
  posts: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.Post.findMany({
      where: {
        authorId: parent.id,
      },
    });
  },
};

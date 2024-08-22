export const User = {
  posts: async (parent: any, args: any, { prisma }: any) => {
    console.log("inner", parent.id);
    return await prisma.Post.findMany({
      where: {
        authorId: parent.id,
      },
    });
  },
};

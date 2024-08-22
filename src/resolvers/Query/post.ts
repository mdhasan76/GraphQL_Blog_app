import { userLoader } from "../../dataLoader/userLoader";

export const Post = {
  author: async (parent, args, context) => {
    userLoader.load(parent.authorId);
    //     return await context.prisma.user.findUnique({
    //       where: {
    //         id: parent.authorId,
    //       },
    //     });
  },
};

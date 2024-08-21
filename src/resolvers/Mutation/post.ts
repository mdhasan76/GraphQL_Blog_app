interface IPost {
  title: string;
  content: string;
  isPublished?: boolean;
}
interface PostEdit {
  id: number;
  title?: string;
  content?: string;
  isPublished?: boolean;
}
export const postMutation = {
  addPost: async (parent: any, args: IPost, { prisma, userData }) => {
    const post = await prisma.Post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userData.userId,
        ...(args.isPublished && { isPublished: args.isPublished }),
      },
    });
    if (!post) {
      return {
        errorMessage: "Failed to create post",
        post: null,
      };
    }
    return {
      errorMessage: null,
      post: post,
    };
  },
  editPost: async (parent: any, { post }: { post: PostEdit }, { prisma }) => {
    const { id, ...rest } = post;
    const doesPostExist = await prisma.Post.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!doesPostExist) {
      return {
        errorMessage: "Post not found",
        post: null,
      };
    }
    const findPost = await prisma.Post.update({
      where: {
        id: Number(id),
      },
      data: {
        ...rest,
      },
      include: {
        author: true,
      },
    });
    if (!findPost) {
      return {
        errorMessage: "Failed to update post",
        post: null,
      };
    }
    return {
      errorMessage: null,
      post: findPost,
    };
  },
  deletePost: async (parent: any, { id }, { prisma }) => {
    const findPost = await prisma.Post.findUnique({
      where: {
        id,
      },
    });
    if (!findPost) {
      return {
        errorMessage: "Post not found",
        post: null,
      };
    }
    await prisma.Post.delete({
      where: {
        id,
      },
    });
    return {
      successMessage: "Post deleted successfully",
    };
  },
};

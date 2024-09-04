"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMutation = void 0;
exports.postMutation = {
    addPost: async (parent, args, { prisma, userData }) => {
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
    editPost: async (parent, { post }, { prisma }) => {
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
    deletePost: async (parent, { id }, { prisma }) => {
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

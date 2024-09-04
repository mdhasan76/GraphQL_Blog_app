"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
exports.Query = {
    allUsers: async (parent, args, { prisma }) => {
        return await prisma.user.findMany();
    },
    posts: async (parent, args, { prisma }) => {
        // console.log("Post");
        return await prisma.Post.findMany();
    },
};

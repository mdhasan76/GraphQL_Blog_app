"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.User = {
    posts: async (parent, args, { prisma }) => {
        // console.log("inner", parent.id);
        return await prisma.Post.findMany({
            where: {
                authorId: parent.id,
            },
        });
    },
};

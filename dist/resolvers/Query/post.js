"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const userLoader_1 = require("../../dataLoader/userLoader");
exports.Post = {
    author: async (parent, args, context) => {
        userLoader_1.userLoader.load(parent.authorId);
        //     return await context.prisma.user.findUnique({
        //       where: {
        //         id: parent.authorId,
        //       },
        //     });
    },
};

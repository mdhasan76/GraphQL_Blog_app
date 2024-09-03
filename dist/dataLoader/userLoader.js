"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoader = void 0;
const client_1 = require("@prisma/client");
const dataloader_1 = __importDefault(require("dataloader"));
const prisma = new client_1.PrismaClient();
const batchUser = async (ids) => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
    const userData = {};
    users.forEach((user) => {
        userData[user.id] = user;
    });
    return ids.map((id) => userData[id]);
};
exports.userLoader = new dataloader_1.default(batchUser);

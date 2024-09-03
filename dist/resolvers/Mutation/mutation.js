"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const auth_1 = require("./auth");
const post_1 = require("./post");
exports.Mutation = {
    ...auth_1.authMutations,
    ...post_1.postMutation,
};

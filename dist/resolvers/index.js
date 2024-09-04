"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const query_1 = require("./Query/query");
const mutation_1 = require("./Mutation/mutation");
const user_1 = require("./Query/user");
const post_1 = require("./Query/post");
exports.resolvers = {
    Query: query_1.Query,
    User: user_1.User,
    Post: post_1.Post,
    Mutation: mutation_1.Mutation,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMutations = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authMutations = {
    signUp: async (parent, args, { prisma }) => {
        const isEmailAlreadyUsed = await prisma.user.findFirst({
            where: {
                email: args.email,
            },
        });
        if (isEmailAlreadyUsed) {
            return {
                token: null,
                errorMessage: "Email already used!",
            };
        }
        const { bio, ...rest } = args;
        const encryptPassword = crypto_js_1.default.AES.encrypt(rest.password, process.env.CRYPTO_ENCRYPTION_KEY).toString();
        rest.password = encryptPassword;
        const newUser = await prisma.user.create({
            data: rest,
        });
        if (bio) {
            const profileData = await prisma.profile.create({
                data: {
                    userId: newUser.id,
                    bio: bio,
                },
            });
            if (!profileData) {
                return {
                    token: null,
                    errorMessage: "failed to create profile",
                };
            }
        }
        const token = await jsonwebtoken_1.default.sign({ userId: newUser.id, name: newUser.name }, process.env.JWT_SECRET);
        return { token };
    },
    signIn: async (parent, args, { prisma }) => {
        const user = await prisma.user.findFirst({
            where: {
                email: args.email,
            },
        });
        if (!user) {
            return {
                errorMessage: "User not found",
                token: null,
            };
        }
        const originalPassword = crypto_js_1.default.AES.decrypt(user.password, process.env.CRYPTO_ENCRYPTION_KEY).toString(crypto_js_1.default.enc.Utf8);
        if (originalPassword !== args.password) {
            return {
                errorMessage: "Password not matched",
                token: null,
            };
        }
        const token = await jsonwebtoken_1.default.sign({ userId: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return {
            token,
            errorMessage: null,
        };
    },
};

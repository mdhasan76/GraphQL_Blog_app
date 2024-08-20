import { PrismaClient } from "@prisma/client";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface IUser {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const resolvers = {
  Query: {
    allUsers: async () => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signUp: async (parent: any, args: IUser, context: any) => {
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
      const encryptPassword = CryptoJS.AES.encrypt(
        rest.password,
        process.env.CRYPTO_ENCRYPTION_KEY
      ).toString();
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
      const token = jwt.sign(
        { userId: newUser.id, name: newUser.name },
        process.env.JWT_SECRET
      );
      return { token };
    },
    signIn: async (
      parent,
      args: { email: string; password: string },
      context: any
    ) => {
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

      const originalPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTO_ENCRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);

      if (originalPassword !== args.password) {
        return {
          errorMessage: "Password not matched",
          token: null,
        };
      }
      const token = jwt.sign(
        { userId: user.id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return {
        token,
        errorMessage: null,
      };
    },
  },
};

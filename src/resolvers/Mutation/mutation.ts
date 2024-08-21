import { authMutations } from "./auth";
import { postMutation } from "./post";

export const Mutation = {
  ...authMutations,
  ...postMutation,
};

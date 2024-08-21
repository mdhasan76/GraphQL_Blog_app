import jwt from "jsonwebtoken";
const verifyToken = async (token: string) => {
  try {
    const tokenDecode = await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    return tokenDecode;
  } catch (err) {
    return null;
  }
};
export const jwtHelpers = { verifyToken };

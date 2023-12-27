import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
}

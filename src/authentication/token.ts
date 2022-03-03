import jwt from "jsonwebtoken";
import { Role, User } from "../models/user";

type DecodedToken = Pick<User, "mail" | "name" | "role">;

export const generateToken = (user: Pick<User, "mail" | "name" | "role">) => {
  return jwt.sign(JSON.stringify(user), process.env.SECRET_TOKEN);
};

export const decodeTokenRole = (token: string): DecodedToken => {
  return jwt.decode(token) as DecodedToken;
};

import jwt from "jsonwebtoken";
import { Role, IUser } from "../models/user";

type DecodedToken = Pick<IUser, "mail" | "name" | "role">;

export const generateToken = (user: Pick<IUser, "mail" | "name" | "role">) => {
  return jwt.sign(JSON.stringify(user), process.env.SECRET_TOKEN);
};

export const decodeTokenRole = (token: string): DecodedToken => {
  return jwt.decode(token) as DecodedToken;
};

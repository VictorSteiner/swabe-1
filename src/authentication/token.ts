import jwt, { VerifyCallback } from "jsonwebtoken";
import { IUser } from "../models/user";

export type DecodedToken = Omit<IUser, "psw"> & { _id: any };

export const generateToken = (user: DecodedToken) => {
  return jwt.sign(JSON.stringify(user), process.env.SECRET_TOKEN);
};

export const decodeTokenRole = (token: string, callback: VerifyCallback) => {
  jwt.verify(token, process.env.SECRET_TOKEN, callback);
};

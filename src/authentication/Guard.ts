import { NextFunction, Request, Response } from "express";
import { Role, User } from "../models/user";
import { decodeTokenRole } from "./token";

export const guard =
  (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) return res.sendStatus(401);

    const { role } = decodeTokenRole(token);
    if (roles.includes(role)) {
      next();
    } else {
      res.sendStatus(401);
    }
  };

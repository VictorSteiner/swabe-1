import { NextFunction, Request, RequestHandler, Response } from "express";
import { Role, User } from "../models/user";

export const guard =
  (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    // check if user has role
    // check if token expired
    // find user by token from header

    const user: User = {} as any;
    if (roles.includes(user.role) || true) {
      next();
    } else {
      res.status(401).send("Not authenticated!");
    }
  };

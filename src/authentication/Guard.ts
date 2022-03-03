import { NextFunction, Request, Response } from "express";
import { Role } from "../models/user";
import { DecodedToken, decodeTokenRole } from "./token";

export const guard =
  (roles: Role[], passUser: boolean = false) =>
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) return res.sendStatus(401);

    decodeTokenRole(token, (error, decoded: DecodedToken) => {
      if (error) {
        res.sendStatus(400);
      }
      if (roles.includes(decoded.role)) {
        if (passUser) {
          res.locals.user = { _id: decoded._id, role: decoded.role };
        }
        next();
      } else {
        res.sendStatus(401);
      }
    });
  };

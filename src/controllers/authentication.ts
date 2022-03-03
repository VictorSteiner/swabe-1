import { RequestHandler } from "express";
import { generateToken } from "../authentication/token";
import { Role } from "../models/user";

export const login: RequestHandler = (req, res) => {
  // FOR DEBUG ONLY!
  const manager = generateToken({
    mail: "manager@mail.dk",
    name: "manager",
    role: Role.manager,
  });

  const clerk = generateToken({
    mail: "clerk@mail.dk",
    name: "clerk",
    role: Role.clerk,
  });

  const guest = generateToken({
    mail: "guest@mail.dk",
    name: "guest",
    role: Role.guest,
  });

  return res.status(201).json({ manager, clerk, guest });
};

export const getUsers: RequestHandler = (req, res) => {
  res.send("Not implemented");
};

export const getUserById: RequestHandler = (req, res) => {
  res.send("Not implemented");
};

export const createUser: RequestHandler = (req, res) => {
  res.send("Not implemented");
};

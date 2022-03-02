import { RequestHandler } from "express";

const login: RequestHandler = (req, res) => {
  const { mail, psw } = req.body as { mail: string; psw: string };

  res.json({});
};

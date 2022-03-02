import { IRouterMatcher, Router } from "express";
import * as routes from "./config.json";

const Route = Router({ strict: true, caseSensitive: true });

type Token = { jwt: String };

// POST /Login
Route.post(
  `${routes.authentication.login}/${routes.params.id}`,
  (req, res) => {
    const { mail, psw } = req.body;
    res.json({ jwt: "" });
  }
);

// POST /user
Route.get(routes.authentication.user, (req, res) => {
  res.send("Not Implemented");
});

// GET /users
Route.get(`${routes.authentication.user}/${routes.params.id}`, (req, res) => {
  res.send("Not Implemented");
});

export { Route as authenticationRouter };

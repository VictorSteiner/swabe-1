import { IRouterMatcher, Router } from "express";
import { createUser, getUserById, login } from "../controllers/authentication";
import * as routes from "./config.json";

const Route = Router({ strict: true, caseSensitive: true });

type Token = { jwt: String };

// POST /Login
Route.post(`${routes.authentication.login}/${routes.params.id}`, login);

// POST /user
Route.get(routes.authentication.user, createUser);

// GET /users (by id)
Route.get(`${routes.authentication.user}/${routes.params.id}`, getUserById);

// Get /users
Route.get(routes.authentication.user, getUserById);

export { Route as authenticationRouter };

import { IRouterMatcher, Router } from "express";
import { createUser, getUserById, getUsers, login } from "../controllers/authentication";
import * as routes from "./_config.json";

const Route = Router({ strict: true, caseSensitive: true });

type Token = { jwt: String };

// GET /users
Route.get(routes.authentication.users, getUsers);

// GET /users (by id)
Route.get(`${routes.authentication.users}/${routes.params.id}`, getUserById);

// POST /user
Route.post(routes.authentication.user, createUser);

// POST /Login
Route.post(`${routes.authentication.login}`, login);


export { Route as authenticationRouter };

import { Router } from "express";
import * as routes from "./config.json";

const Route = Router({ strict: true, caseSensitive: true });

export { Route as roomRouter };
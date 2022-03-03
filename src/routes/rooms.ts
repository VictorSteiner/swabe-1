import { Router } from "express";
import { guard } from "../authentication/Guard";
import {
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
  updateRoom,
} from "../controllers/rooms";
import { Role } from "../models/user";
import * as routes from "./_config.json";

const Route = Router({ strict: true, caseSensitive: true });

Route.get("/", guard([Role.manager, Role.clerk, Role.guest]), getRooms);

Route.get(
  `$/${routes.params.id}`,
  guard([Role.manager, Role.clerk, Role.guest]),
  getRoomById
);

Route.post("/", guard([Role.manager]), createRoom);

Route.patch(
  `${routes.params.id}`,
  guard([Role.manager, Role.clerk]),
  updateRoom
);

Route.delete(`/${routes.params.id}`, guard([Role.manager]), deleteRoom);

export { Route as roomRouter };

import { Router } from "express";
import { guard } from "../authentication/guard";
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

// GET /rooms
Route.get("/", guard([Role.manager, Role.clerk, Role.guest]), getRooms);

// GET /rooms/{:uid}
Route.get(
  `/${routes.params.id}`,
  guard([Role.manager, Role.clerk, Role.guest]),
  getRoomById
);

// POST /rooms/{:uid}
Route.post(`/${routes.params.id}`, guard([Role.manager]), createRoom);

// PATCH /rooms/{:uid}
Route.patch(
  `/${routes.params.id}`,
  guard([Role.manager, Role.clerk]),
  updateRoom
);

// DELETE /rooms/{:uid}
Route.delete(`/${routes.params.id}`, guard([Role.manager]), deleteRoom);

export { Route as roomRouter };

import { Router } from "express";
import {
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
  updateRoom,
} from "../controllers/rooms";
import * as routes from "./_config.json";

const Route = Router({ strict: true, caseSensitive: true });

Route.get("/", getRooms);

Route.get(`$/${routes.params.id}`, getRoomById);

Route.post("/", createRoom);

Route.patch(`${routes.params.id}`, updateRoom);

Route.delete(`/${routes.params.id}`, deleteRoom);

export { Route as roomRouter };

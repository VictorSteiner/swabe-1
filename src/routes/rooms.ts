import { Router } from "express";
import {
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
  updateRoom,
} from "../controllers/rooms";
import * as routes from "./config.json";

const Route = Router({ strict: true, caseSensitive: true });

Route.get(routes.main.rooms, getRooms);

Route.get(`${routes.main.rooms}/${routes.params.id}`, getRoomById);

Route.post(`${routes.main.rooms}/${routes.params.id}`, createRoom);

Route.patch(`${routes.main.rooms}/${routes.params.id}`, updateRoom);

Route.delete(`${routes.main.rooms}/${routes.params.id}`, deleteRoom);

export { Route as roomRouter };

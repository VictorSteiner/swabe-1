import { Router } from "express";
import {
  createReservation,
  deleteReservation,
  getReservationById,
  getReservations,
  updateReservation,
} from "../controllers/reservations";
import * as routes from "./_config.json";

const Route = Router({ strict: true, caseSensitive: true });

Route.get("/", getReservations);

Route.get(`/${routes.params.id}`, getReservationById);

Route.post("/", createReservation);

Route.patch(`/${routes.params.id}`, updateReservation);

Route.delete(`/${routes.params.id}`, deleteReservation);

export { Route as reservationRouter };

import { Router } from "express";
import { guard } from "../authentication/guard";
import {
  createReservation,
  deleteReservation,
  getReservationById,
  getReservations,
  updateReservation,
} from "../controllers/reservations";
import { Role } from "../models/user";
import * as routes from "./_config.json";

const Route = Router({ strict: true, caseSensitive: true });

// GET /reservations
Route.get("/", guard([Role.manager, Role.clerk]), getReservations);

// GET /reservations/{:uid}
Route.get(
  `/${routes.params.id}`,
  guard([Role.manager, Role.clerk, Role.guest], true),
  getReservationById
);

// POST /reservations/{:uid}
Route.post(
  "/",
  guard([Role.manager, Role.clerk, Role.guest]),
  createReservation
);

// PATCH /reservations/{:uid}
Route.patch(
  `/${routes.params.id}`,
  guard([Role.manager, Role.clerk, Role.guest], true),
  updateReservation
);

// DELETE /reservations/{:uid}
Route.delete(
  `/${routes.params.id}`,
  guard([Role.manager, Role.clerk, Role.guest]),
  deleteReservation
);

export { Route as reservationRouter };

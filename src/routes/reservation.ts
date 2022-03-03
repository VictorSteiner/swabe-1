import { Router } from "express";
import { guard } from "../authentication/Guard";
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

Route.get("/", guard([Role.manager, Role.clerk]), getReservations);

Route.get(
  `/${routes.params.id}`,
  guard([Role.manager, Role.clerk, Role.guest]),
  getReservationById
);

Route.post(
  "/",
  guard([Role.manager, Role.clerk, Role.guest]),
  createReservation
);

Route.patch(
  `/${routes.params.id}`,
  guard([Role.manager, Role.clerk, Role.guest]),
  updateReservation
);

Route.delete(
  `/${routes.params.id}`,
  guard([Role.manager, Role.clerk, Role.guest]),
  deleteReservation
);

export { Route as reservationRouter };

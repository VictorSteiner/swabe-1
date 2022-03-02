import { Router } from "express";
import {
  createReservation,
  deleteReservation,
  getReservationById,
  getReservations,
  updateReservation,
} from "../controllers/reservations";
import * as routes from "./config.json";

const Route = Router({ strict: true, caseSensitive: true });

Route.get(routes.main.reservations, getReservations);

Route.get(
  `${routes.main.reservations}/${routes.params.id}`,
  getReservationById
);

Route.post(routes.main.reservations, createReservation);

Route.patch(
  `${routes.main.reservations}/${routes.params.id}`,
  updateReservation
);

Route.delete(
  `${routes.main.reservations}/${routes.params.id}`,
  deleteReservation
);

export { Route as reservationRouter };

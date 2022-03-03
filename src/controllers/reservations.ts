import { RequestHandler } from "express";

export const getReservations: RequestHandler = (req, res) => {
  res.send("Not implemented");
};

export const getReservationById: RequestHandler = (req, res) => {
  console.log(res.locals.user);
  res.send("Not implemented");
};

export const createReservation: RequestHandler = (req, res) => {
  res.send("Not implemented");
};

export const updateReservation: RequestHandler = (req, res) => {
  res.send("Not implemented");
};

export const deleteReservation: RequestHandler = (req, res) => {
  res.send("Not implemented");
};

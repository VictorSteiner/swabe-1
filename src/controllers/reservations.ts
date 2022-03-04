import { RequestHandler } from "express";
import { start } from "repl";
import { ReservationModel } from "../models/reservation";
import { RoomModel } from "../models/room";
import { IUser, Role, UserModel } from "../models/user";

export const getReservations: RequestHandler = async (req, res) => {
  const { from, to } = req.body;
  try {
    let reservations = await ReservationModel.find().exec();
    if (!!from) {
      reservations = reservations.filter(
        (reservation) => reservation.start > from
      );
    }
    if (!!to) {
      reservations = reservations.filter((reservation) => reservation.end < to);
    }
    res.status(200).send(reservations);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getReservationById: RequestHandler = async (req, res) => {
  try {
    const reservation = await ReservationModel.findById(req.params.uid).exec();
    if (res.locals.user.role === Role.guest) {
      const user = await UserModel.findById(res.locals.user._id);
      if (reservation.user.mail === user.mail) {
        res.status(200).json(reservation);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.status(200).json(reservation);
    }
  } catch (error) {
    res.status(400).json({ ...error });
  }
};

export const createReservation: RequestHandler = async (req, res) => {
  const { start, end, roomNumber } = req.body;

  try {
    if (end < start) {
      throw new Error("you done went and did it");
    }

    let user = await UserModel.findById(res.locals.user._id).exec();
    let room = await RoomModel.findOne({ roomNumber }).exec();

    ReservationModel.create({ user, start, end, room }),
      (error, result) => {
        if (error) {
          res.status(400).json({ ...error });
        } else {
          res.status(201).json({ result });
        }
      };
  } catch (error) {
    res.status(400).json({ ...error });
  }
};

export const updateReservation: RequestHandler = async (req, res) => {
  try {
    const reservation = await ReservationModel.findById(req.params.uid).exec();
    if (res.locals.user.role === Role.guest) {
      const user = await UserModel.findById(res.locals.user._id);
      if (reservation.user.mail !== user.mail) {
        res.sendStatus(401);
        return;
      }
    }
    res.status(201).json(
      await ReservationModel.findByIdAndUpdate(req.params.uid, req.body, {
        new: true,
      }).exec()
    );
  } catch (error) {
    res.status(400).json({ ...error });
  }
};

export const deleteReservation: RequestHandler = (req, res) => {
  ReservationModel.findByIdAndDelete(req.params.uid)
    .exec()
    .then(() => {
      res.sendStatus(204);
    })
    .catch((reason) => {
      res.status(400).json(reason);
    });
};

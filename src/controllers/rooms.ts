import { RequestHandler } from "express";
import { ReservationModel } from "../models/reservation";
import { IRoom, RoomModel } from "../models/room";

export const getRooms: RequestHandler = async (req, res) => {
  const { date } = req.body;
  try {
    const rooms = await RoomModel.find().exec();
    if (date === undefined) {
      res.status(200).json(rooms);
    } else {
      const roomReservated = (await ReservationModel.find().exec())
        .filter(
          (reservation) => date > reservation.start && reservation.end > date
        )
        .map(({ room }) => room);
      const reservatedIds = roomReservated.map(({ roomNumber }) => roomNumber);

      const availableRooms = rooms.reduce<IRoom[]>((acc, cur) => {
        if (!reservatedIds.includes(cur.roomNumber)) {
          acc.push(cur);
        }
        return acc;
      }, []);
      res.status(200).json(availableRooms);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getRoomById: RequestHandler = (req, res) => {
  RoomModel.findOne({ roomNumber: req.params.uid })
    .exec()
    .then((value) => {
      res.status(200).json(value);
    })
    .catch((reason) => {
      res.status(400).json(reason);
    });
};

export const createRoom: RequestHandler = (req, res) => {
  console.log(req.params.uid);

  RoomModel.create({ roomNumber: req.params.uid }, (error, result) => {
    if (error) {
      res.status(400).json({ ...error });
    } else {
      res.status(201).json({ roomNumber: result.roomNumber });
    }
  });
};

export const updateRoom: RequestHandler = (req, res) => {
  RoomModel.findOneAndUpdate(
    { roomNumber: req.params.uid },
    req.body,
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(doc);
      }
    }
  );
};

export const deleteRoom: RequestHandler = (req, res) => {
  RoomModel.findOneAndDelete({ roomNumber: req.params.uid })
    .exec()
    .then(() => {
      res.sendStatus(204);
    })
    .catch((reason) => {
      res.status(400).json(reason);
    });
};

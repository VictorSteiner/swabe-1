import { RequestHandler } from "express";
import { RoomModel } from "../models/room";
import { Types } from "mongoose";

export const getRooms: RequestHandler = (req, res) => {
  const { available } = req.body;
  RoomModel.find()
    .exec()
    .then((value) => {
      res
        .status(200)
        .json(
          available !== undefined
            ? value.filter((room) => room.available === available)
            : value
        );
    })
    .catch((reason) => {
      res.status(400).json(reason);
    });
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

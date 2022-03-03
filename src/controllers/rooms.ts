import { RequestHandler } from "express";
import { RoomModel } from "../models/room";
import { roomRouter } from "../routes/rooms";

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
  RoomModel.findById(req.params.uid)
    .exec()
    .then((value) => {
      res.status(200).json(value);
    })
    .catch((reason) => {
      res.status(400).json(reason);
    });
};

export const createRoom: RequestHandler = (req, res) => {
  RoomModel.create(req.body, (error, result) => {
    if (error) {
      res.sendStatus(400).json({ ...error });
    } else {
      res.status(201).json({ _id: result.id });
    }
  });
};

export const updateRoom: RequestHandler = (req, res) => {
  RoomModel.findByIdAndUpdate(req.params.uid, req.body, (err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(doc);
    }
  });
};

export const deleteRoom: RequestHandler = (req, res) => {
  RoomModel.findByIdAndDelete(req.params.uid)
    .exec()
    .then(() => {
      res.sendStatus(204);
    })
    .catch((reason) => {
      res.status(400).json(reason);
    });
};

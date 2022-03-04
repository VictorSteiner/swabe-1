import mongoose from "mongoose";
import { Model, Schema } from "mongoose";
import { IRoom, RoomSchema } from "./room";
import { IUser, UserSchema } from "./user";

export type IReservation = {
  user: IUser;
  room: IRoom;
  start: Number;
  end: Number;
};

interface IReservationModel extends Model<IReservation> {}

const schema = new Schema<IReservation, IReservationModel>({
  user: { type: UserSchema, required: true },
  room: { type: RoomSchema, required: true },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
});

const model = mongoose.model<IReservation>("Reservation", schema);

export { schema as ReservationSchema, model as ReservationModel };

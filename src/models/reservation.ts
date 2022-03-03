import mongoose from "mongoose";
import { Model, Schema } from "mongoose";
import { IRoom, RoomModel, RoomSchema } from "./room";
import { IUser, UserModel, UserSchema } from "./user";

export type IReservation = {
  user: IUser;
  room: IRoom;
  start: Date;
  end: Date;
};

interface IReservationModel extends Model<IReservation> {}

const schema = new Schema<IReservation, IReservationModel>({
  user: { type: UserSchema, required: true },
  room: { type: RoomSchema, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const model = mongoose.model<IReservation>("Reservation", schema);

export { schema as ReservationSchema, model as ReservationModel };

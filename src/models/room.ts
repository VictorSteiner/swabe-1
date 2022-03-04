import mongoose, { Model, Schema } from "mongoose";
import { IReservation, ReservationSchema } from "./reservation";

export type IRoom = {
  roomNumber: Number;
  available: Boolean;
  reservations: IReservation[];
};

interface IRoomModel extends Model<IRoom> {}

const schema = new Schema<IRoom, IRoomModel>({
  roomNumber: { type: Number, required: true, unique: true },
  reservations: { type: [ReservationSchema] },
  available: { type: Boolean, required: true, default: true },
});

schema.virtual("available").get(() => {
  return true;
});

const model = mongoose.model<IRoom>("Room", schema);

export { schema as RoomSchema, model as RoomModel };

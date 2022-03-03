import mongoose from "mongoose";
import { Model, Schema } from "mongoose";

export type IRoom = {
  roomNumber: Number;
  available: Boolean;
};

interface IRoomModel extends Model<IRoom> {}

const schema = new Schema<IRoom, IRoomModel>({
  roomNumber: { type: Number, required: true, unique: true },
  available: { type: Boolean, required: true, default: true },
});

const model = mongoose.model<IRoom>("Room", schema);

export { schema as RoomSchema, model as RoomModel };

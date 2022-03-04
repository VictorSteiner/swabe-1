import mongoose, { Model, Schema } from "mongoose";

export type IRoom = {
  roomNumber: Number;
};

interface IRoomModel extends Model<IRoom> {}

const schema = new Schema<IRoom, IRoomModel>({
  roomNumber: { type: Number, required: true, unique: true },
});

const model = mongoose.model<IRoom>("Room", schema);

export { schema as RoomSchema, model as RoomModel };

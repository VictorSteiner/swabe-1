import mongoose from "mongoose";
import { Model, Schema } from "mongoose";

export enum Role {
  manager = "manager",
  clerk = "clerk",
  guest = "guest",
}

export type IUser = {
  name: String;
  mail: String;
  psw: String;
  role: Role;
};

export type UserInput = {
  name: string;
  mail: string;
  psw: string;
  role: Role;
};

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatetAt: Date;
  comparePassword(cPassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {}

const schema = new Schema<IUser, IUserModel>({
  name: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  psw: { type: String, required: true },
  role: { type: String, required: true, enum: Role },
});

const model = mongoose.model<IUser>("User", schema);

export { schema as UserSchema, model as UserModel };

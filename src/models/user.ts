import { model, Schema } from "mongoose";

export enum Role {
  manager = "manager",
  clerk = "clerk",
  guest = "guest",
}

export type User = {
  name: String;
  mail: String;
  psw: String;
  role: Role;
};

// export const UserSchema: Schema<User> = new Schema<User>({
//   name: String,
//   mail: String,
//   psw: String,
//   role: Role,
// });

// export const UserModel = model<User>("User", UserSchema);

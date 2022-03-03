import { IUser, UserInput, UserModel } from "../models/user";

export async function createUser(input: UserInput) {
  return UserModel.create<UserInput>(input);
}

export function findUser(query, options = { lean: true }) {
  return UserModel.findOne(query, null, options);
}

// export async function loginUser(input) {
//     const user = await findUser({input.})
// }

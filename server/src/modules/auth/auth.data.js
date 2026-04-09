import { UserModel } from "../../../database/models/user.model.js";

export const findUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

export const createUser = async (data) => {
  const user = await UserModel.create(data);
  return user;
};

export const confirmEmail = async (email, code) => {
  const result = await UserModel.updateOne(
    { email, code },
    { $set: { confirmEmail: true, code: null } }
  );

  return result.modifiedCount > 0;
};

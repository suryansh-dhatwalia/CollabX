import userModel from "../model/userModel.js";

export const createUser = async ({ firstname,lastname,email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password not found");
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userModel.create({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });
  return user;
};

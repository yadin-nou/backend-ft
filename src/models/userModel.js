import userSchema from "./userSchema.js";

export const insertUser = (obj) => {
  return userSchema(obj).save();
};

export const confirmEmail = (token) => {
  return userSchema.findOne({ token });
};

export const loginUserByEmail = (email) => {
  return userSchema.findOne({ email });
};

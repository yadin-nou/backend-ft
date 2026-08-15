import userSchema from "./userSchema.js";

export const insertUser = (obj) => {
  try {
    return userSchema(obj).save();
  } catch (error) {
    console.log(error.message);
  }
};

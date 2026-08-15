import bcrypt from "bcrypt";

const saltNum = 15;

export const pwdHashEncrypt = (pwd) => {
  return bcrypt.hashSync(pwd, saltNum);
};

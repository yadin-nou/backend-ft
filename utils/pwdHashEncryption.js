import bcrypt from "bcrypt";

const saltNum = 15;

export const pwdHashEncrypt = (pwd) => {
  return bcrypt.hashSync(pwd, saltNum);
};

export const pwdMatching = (plainPWD, hashPWD) => {
  return bcrypt.compareSync(plainPWD, hashPWD);
};

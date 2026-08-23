import transactionSchema from "./transactionSchema.js";

export const addTransaction = (data) => {
  return transactionSchema(data).save();
};

export const getTransaction = (userID) => {
  return transactionSchema.find({ userID });
};

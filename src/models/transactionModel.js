import transactionSchema from "./transactionSchema.js";

export const addTransaction = (data) => {
  return transactionSchema(data).save();
};

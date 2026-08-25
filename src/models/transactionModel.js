import transactionSchema from "./transactionSchema.js";

export const addTransaction = (data) => {
  return transactionSchema(data).save();
};

export const getTransaction = (userID) => {
  return transactionSchema.find({ userID });
};
export const deleteTransaction = (userID, _ids) => {
  // userID and _ids must match in database
  //$in:_ids check in array of _ids which has _id
  return transactionSchema.deleteMany({ userID, _id: { $in: _ids } });
};
// delete without userID
// export const deleteTransaction = (_ids) => {
//   return transactionSchema.deleteMany({_id: { $in: _ids } });
// };

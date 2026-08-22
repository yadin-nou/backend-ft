import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { addTransaction } from "../models/transactionModel.js";

const transactionRouters = express();

//user add transaction
transactionRouters.post("/", auth, async (req, res, next) => {
  try {
    const result = await addTransaction(req.body);
    const user = req.userInfo;
    // console.log(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "a new transaction added",
        })
      : res.json({
          status: "error",
          message: error.message,
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
export default transactionRouters;

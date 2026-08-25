import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  addTransaction,
  deleteTransaction,
  getTransaction,
} from "../models/transactionModel.js";

const transactionRouters = express();

//user add transaction
transactionRouters.post("/", auth, async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    req.body.userID = _id;
    //  console.log(req.body);
    const result = await addTransaction(req.body);

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

transactionRouters.get("/", auth, async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const result = await getTransaction(_id);
    result
      ? res.json({
          data: result,
          status: "success",
          message: "Transaction succesfully retrived!",
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
transactionRouters.delete("/", auth, async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const result = await deleteTransaction(_id, req.body);
    result
      ? res.json({
          data: result,
          status: "success",
          message: "Delete succesfully",
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

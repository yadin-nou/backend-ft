import express from "express";
import { insertUser } from "../models/userModel.js";
import { pwdHashEncrypt } from "../../utils/pwdHashEncryption.js";

const userRouter = express();

//user Signup
userRouter.post("/signup", async (req, res) => {
  try {
    req.body.password = pwdHashEncrypt(req.body.password);
    const result = await insertUser(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "Account has been created, you can login now!",
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
//user login
//user profile

userRouter.get("/", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "GET TO DO",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default userRouter;

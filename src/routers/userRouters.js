import express from "express";
import { insertUser } from "../models/userModel.js";
import { pwdHashEncrypt } from "../../utils/pwdHashEncryption.js";

const userRouter = express();

//user Signup
userRouter.post("/signup", async (req, res) => {
  try {
    req.body.password = pwdHashEncrypt(req.body.password);
    // console.log(req.body, " userRouter.js");
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
    error.code === 11000
      ? res.json({
          status: "error",
          message: "Your email is exist! Please try again later",
        })
      : res.json({
          status: "error",
          message: error.message,
        });
  }
});
//user login
userRouter.post("/login", (req, res) => {
  try {
    console.log(req.body, " body");
    res.json({
      status: "success",
      message: "Login success",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
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

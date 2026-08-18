import express from "express";
import { insertUser, loginUserByEmail } from "../models/userModel.js";
import { pwdHashEncrypt, pwdMatching } from "../../utils/pwdHashEncryption.js";

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
userRouter.post("/login", async (req, res) => {
  try {
    //recieve email and password
    const { email, password } = req.body;
    if (email && password) {
      //check user by email from db
      const user = await loginUserByEmail(email);
      //compare password
      const isMatch = pwdMatching(password, user.password);
      if (isMatch) {
        //set password ot undfined before response to the client
        user.password = undefined;
        res.status(201).json({
          user,
          status: "success",
          message: "Login success",
        });
        return;
      }
    }

    res.status(401).json({
      status: "error",
      message: "Login not successfully",
    });
  } catch (error) {
    res.status(500).json({
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

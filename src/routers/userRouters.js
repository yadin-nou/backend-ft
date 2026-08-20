import express from "express";
import { insertUser, loginUserByEmail } from "../models/userModel.js";
import { pwdHashEncrypt, pwdMatching } from "../../utils/pwdHashEncryption.js";
import { signJWT } from "../../utils/jwt.js";
import { auth } from "../middlewares/authMiddleware.js";

const userRouter = express();

//user Signup
userRouter.post("/signup", async (req, res, next) => {
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
userRouter.post("/login", async (req, res, next) => {
  try {
    //recieve email and password
    const { email, password } = req.body;
    if (email && password) {
      //check user by email from db
      const user = await loginUserByEmail(email);
      //compare password
      const isMatch = pwdMatching(password, user.password);
      if (isMatch) {
        const jwtAccess = signJWT({ email });
        //set password ot undfined before response to the client
        user.password = undefined;
        res.status(201).json({
          user,
          jwtAccess,
          status: "success",
          message: "Login success",
        });
        return;
      }
    }

    res.status(401).json({
      status: "error",
      error: "Invalid email or password!",
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

//auth execute the request first to verify token befor pass to next function
userRouter.get("/", auth, (req, res, next) => {
  try {
    //req.userInfo is from auth function which execute after next
    const user = req.userInfo;
    res.json({
      status: "success",
      message: "get profile",
      user,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default userRouter;

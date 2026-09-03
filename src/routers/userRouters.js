import express from "express";
import {
  confirmEmail,
  insertUser,
  loginUserByEmail,
} from "../models/userModel.js";
import { pwdHashEncrypt, pwdMatching } from "../../utils/pwdHashEncryption.js";
import { signJWT } from "../../utils/jwt.js";
import { auth } from "../middlewares/authMiddleware.js";
import { userUpdateTemplate } from "../nodemailer/nodeMailer.js";

const userRouter = express();
const userLink = "/api/v1/users/";
const link = process.env.VITE_REACT_URL + "/login";
//console.log(link);
//user confirmation
userRouter.get("/email_confirm", async (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    return res
      .status(400)
      .json({ status: "error", message: "No token provided" });
  }
  const user = await confirmEmail(token);
  if (!user) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid or already used" });
  }
  if (user.tokenExpire < Date.now()) {
    return res.status(400).json({ status: "error", message: "Token Expired" });
  }
  user.isConfirm = true;
  user.token = "undefined";
  // save() is update to db not insert because user recived from confirmEmail by fineOne()
  user.save();
  //console.log(user);
  res.send(`
  <html>
    <body style="font-family: Arial, sans-serif; text-align:center; padding: 60px;">
      <h2>Your email has been verified!</h2>
      <p>Please <a href="${link}" style="color:#4f46e5;">log in</a> to continue.</p>
    </body>
  </html>
`);
});

//user Signup
userRouter.post("/signup", async (req, res, next) => {
  try {
    const { email } = req.body;
    req.body.password = pwdHashEncrypt(req.body.password);
    req.body.token = signJWT({ email });
    //date expired next day
    req.body.tokenExpire = Date.now() + 24 * 60 * 60 * 1000;
    // console.log(req.body, " userRouter.js");
    const result = await insertUser(req.body);
    if (result?._id) {
      res.json({
        status: "success",
        message: "Account has been created, you can login now!",
      });
      req.body.password = undefined;
      // console.log(req.body);
      userUpdateTemplate(req.body);
    } else {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      // res.json({
      //   status: "error",
      //   message: "Your email is exist! Please try again later",
      // });
      error.message = "Your email is exist! Please try again later.";
      error.statusCode = 200;
      next(error);
    }
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
      if (isMatch && user.isConfirm) {
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
    // res.status(500).json({
    //   status: "error",
    //   message: error.message,
    // });
    /* This will run middleware function Glable error */

    next(error);
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
    next(error);
  }
});

export default userRouter;

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
  try {
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
      return res
        .status(400)
        .json({ status: "error", message: "Token Expired" });
    }
    user.isConfirm = true;
    user.token = "undefined";
    // save() is update to db not insert because user recived from confirmEmail by fineOne()
    user.save();
    //console.log(user);
    res.send(`
    <html>
      <body style="font-family: Arial, sans-serif; text-align:center; padding: 60px;">
        <h2 style='color:green'>Your email has been verified!</h2>
        <p>Please <a href="${link}" style="color:#4f46e5;">log in</a> to continue.</p>
      </body>
    </html>
  `);
  } catch (error) {
    next(error);
  }
});

//Resend Email
userRouter.post("/resendEmail", (req, res, next) => {
  try {
    //console.log(req.body);
    userUpdateTemplate(req.body);
    res.json({
      status: "success",
      message: "Resent successfully!, Please check your email again.",
    });
  } catch (error) {
    next(error);
  }
});

//user Signup
userRouter.post("/signup", async (req, res, next) => {
  try {
    const { email } = req.body;
    const passHash = pwdHashEncrypt(req.body.password);
    const tokenData = signJWT({ email });
    const tokenExp = Date.now() + 24 * 60 * 60 * 1000;

    req.body.password = passHash;
    req.body.token = tokenData;
    //date expired next day
    req.body.tokenExpire = tokenExp;
    // console.log(req.body, " userRouter.js");
    const checkEmail = await loginUserByEmail(email);
    //console.log(checkEmail);
    if (checkEmail) {
      // if email exist in DB
      //isConfirm is true
      if (checkEmail.isConfirm) {
        console.log("isConfirm is true");
        const result = await insertUser(req.body);
        if (result?._id) {
          req.body.password = undefined;
          req.body.cmpassword = undefined;
          res.json({
            status: "success",
            message:
              "Account has been created, Please check your email to confirm!",
            emailData: req.body,
          });

          userUpdateTemplate(req.body);
        } else {
          res.json({
            status: "error",
            message: error.message,
          });
        }
      } else {
        //will check tokenExpire
        if (checkEmail.tokenExpire < Date.now()) {
          checkEmail.token = tokenData;
          checkEmail.tokenExpire = tokenExp;
          req.body.password = undefined;
          req.body.cmpassword = undefined;
          req.body.token = checkEmail.token;
          await checkEmail.save();
          userUpdateTemplate(req.body);
          res.json({
            status: "success",
            message: "Please check your email to ACTIVATE your account!",
            emailData: req.body,
          });
        } else {
          //else not expire execute code below
          req.body.password = undefined;
          req.body.cmpassword = undefined;
          req.body.token = checkEmail.token;
          req.body.name = checkEmail.name;
          userUpdateTemplate(req.body);
          res.json({
            status: "success",
            message: "Please check your email to ACTIVATE your account!",
            emailData: req.body,
          });
        }
      }
    } else {
      // email not exist in DB
      const result = await insertUser(req.body);
      if (result?._id) {
        req.body.password = undefined;
        req.body.cmpassword = undefined;
        res.json({
          status: "success",
          message:
            "Account has been created, Please check your email to confirm!",
          emailData: req.body,
        });

        // console.log(req.body);
        userUpdateTemplate(req.body);
      } else {
        res.json({
          status: "error",
          message: error.message,
        });
      }
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

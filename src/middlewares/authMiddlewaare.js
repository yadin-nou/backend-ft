import { verifyToken } from "../../utils/jwt.js";
import { loginUserByEmail } from "../models/userModel.js";

export const auth = async (req, res, next) => {
  try {
    //receiving token
    const { authorization } = req.headers;
    //verify tokoen
    const result = verifyToken(authorization);
    //validate if the token is validate
    //cuz the result response from verifyToken contain email,
    if (result?.email) {
      //read user from database by email to check user is exist or not
      const user = await loginUserByEmail(email);
      //check if user _id work or not
      if (user?._id) {
        //user is authorize
        //store user info in the req header and next() function execute
        req.userInfo = user;
        return next();
      }
    }
    res.status(403).json({
      error: "Unauthorized",
    });
  } catch (error) {
    console.log(error.message);
  }
};

import express from "express";

const userRouter = express();

//user Signup
userRouter.post("/signup", (req, res) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "POST TO DO",
      users: req.body,
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

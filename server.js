import express from "express";
import cors from "cors";
import { dbConnection } from "./src/configs/db.config.js";
import morgan from "morgan";
import userRouter from "./src/routers/userRouters.js";
import transactionRouters from "./src/routers/transactionRouters.js";

const app = express();
//port on the server not found , it will run 8000
const PORT = process.env.PORT || 8000;
app.use(cors());

//database connection
dbConnection();
//use morgan to show http send in console.log
app.use(morgan("tiny"));

//
app.get("/", (req, res) => {
  // res.send("Hello World");
  res.json({
    status: "Sucess",
    message: "Welcome to the page",
  });
});
//Middleware
app.use(express.json());
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/transaction/", transactionRouters);
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("http://localhost:" + PORT);
});

import express from "express";
import cors from "cors";
import { dbConnection } from "./src/configs/db.config.js";
import morgan from "morgan";
import userRouter from "./src/routers/userRouters.js";
import transactionRouters from "./src/routers/transactionRouters.js";
import { errorHandler } from "./src/middlewares/errorMiddleware.js";

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
    message: "Welcome to the page",
  });
});
//for Render.com when we deploy and mail smtp not running
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

app.use(express.json());
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/transaction/", transactionRouters);

//404 page not found
//if the code above not catch, then
//this code will execute
//create template for error code
app.use((req, res, next) => {
  const error = new Error("NOT FOUND");
  //create a status code 404
  error.statusCode = 404;
  //send to error to finallize coding in Middleware Global handler
  next(error);
});
//Middleware Gobal Handler
//errorHandler will response all JSON
app.use(errorHandler);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("http://localhost:" + PORT);
});

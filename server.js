import express from "express";
import cors from "cors";

const app = express();
//port on the server not found , it will run 8000
const PORT = process.env.PORT || 8000;
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
  res.json({
    status: "Sucess",
    message: "Welcome to the page",
  });
});
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("http://localhost:" + PORT);
});

import mongoose from "mongoose";
//const dbURL ="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6";
const dbURL = process.env.MONGO_URL;
export const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(dbURL);
    conn && console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

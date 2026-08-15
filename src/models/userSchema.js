import mongoose from "mongoose";

const dbSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      index: 1,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", dbSchema);

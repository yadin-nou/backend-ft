import mongoose from "mongoose";

const dbSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: 1,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    isComfirm: {
      type: Boolean,
      default: false,
    },
    tokenExpire: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", dbSchema);

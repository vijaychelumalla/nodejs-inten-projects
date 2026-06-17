import mongoose from "mongoose";
import User from "./userModels.js";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user is required"],
    },

    otpHash: {
      type: String,
      required: [true, "OTP hash is required"],
    },
  },
  {
    timestamps: true,
  }
);

const otpModel = mongoose.model("otp", otpSchema);

export default otpModel;
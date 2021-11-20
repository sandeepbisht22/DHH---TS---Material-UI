import { text } from "express";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  usersource: {
    type: String,
    default: "signUpForm",
  },
});
const userModel = mongoose.model("user", userSchema);
export { userModel };

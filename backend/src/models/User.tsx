import mongoose from "mongoose";

interface User {
  name: string;
  email: string;
  phoneno?: string;
  password: string;
  date?: Date;
  usersource: string;
}

const userSchema = new mongoose.Schema<User>({
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
const userModel = mongoose.model<User>("user", userSchema);
export { userModel };

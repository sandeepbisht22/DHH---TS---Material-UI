import config from "config";
import mongoose from "mongoose";

const mongoDBUri: string = config.get("mongoDBUri");
const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoDBUri);
    console.log("MongoDB connected");
  } catch (error: any) {
    console.log(
      "[Error] MongoDB did not get connected due to issue " + error.message
    );
    process.exit(1);
  }
};
export default connectMongoDB;

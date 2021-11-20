import config from "config";
import mongoose from "mongoose";

const mongoDBUri = config.get("mongoDBUri");
const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoDBUri, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(
      "[Error] MongoDB did not get connected due to issue " + error.message
    );
    process.exit(1);
  }
};
export { connectMongoDB };

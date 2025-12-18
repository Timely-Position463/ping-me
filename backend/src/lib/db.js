import mongoose from "mongoose"
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const { MONGO_URI } = ENV;
    if(!MONGO_URI)throw new Error("mONGO_URI is not set")
    const con=await mongoose.connect(ENV.MONGO_URI)
    console.log("MONGODB Connected", con.connection.host)
  } catch (error) {
    console.error("Error connecting to MONGODB", error)
    process.exit(1);
  }
}
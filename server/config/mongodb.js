import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export let ConnectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected🕺");
    });
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

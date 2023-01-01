import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

try {
  mongoose.set("strictQuery", false);
  const db = await mongoose.connect(MONGODB_URI);
  console.log("Database is connected to", db.connection.host);
} catch (error) {
  console.error(error);
}
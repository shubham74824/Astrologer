import dotenv from "dotenv";
import path from "path";

// log the path to ensure it's correct
const envPath = path.resolve(__dirname, "./.env");

dotenv.config({ path: envPath });

export const {
  MONGO_URI
 
} = process.env;

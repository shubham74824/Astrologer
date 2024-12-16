import mongoose from "mongoose";
import DotenvFlow from "dotenv-flow";

// Load environment variables
DotenvFlow.config();

const connectToDatabase = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
  }

  try {
    const connection = await mongoose.connect(mongoURI);
    console.log(`Database connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectToDatabase;

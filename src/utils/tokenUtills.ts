import jwt from "jsonwebtoken";
import { Types } from "mongoose"; // Import Types from mongoose to handle ObjectId
import DotenvFlow from "dotenv-flow";
DotenvFlow.config()
// Get JWT secret from environment variables and validate its existence
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// Generate access and refresh tokens
const generateToken = (user: { id: Types.ObjectId | string }) => {
  try {
    // If the user.id is an ObjectId, cast it to a string
    const userId =
      user.id instanceof Types.ObjectId ? user.id.toString() : user.id;

    const accessToken = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "20d",
    });

    const refreshToken = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error generating tokens: " + error);
  }
};

export { generateToken };

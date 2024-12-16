import Redis from "ioredis";
import DotenvFlow from "dotenv-flow";

// Load environment variables
DotenvFlow.config();

interface RedisClientOptions {
  host: string;
  password: string;
  port: number;
  enableOfflineQueue: boolean;
  retryStrategy: (retries: number) => number;
}

// Create the Redis client with the specified options;
const redisClient = new Redis({
  host: process.env.redis_HostName,
  password: process.env.redis_Credentials,
  port: 11042,
  enableOfflineQueue: false, // Prevent queuing commands when disconnected;
  retryStrategy: (retries: number) => {
    console.error("Redis connection attempt", retries);
    return Math.min(retries * 1000, 3000); // Retry with exponential backoff
  },
} as RedisClientOptions);

redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.on("error", (err: Error) => {
  console.error("Redis error:", err);
});

// Function to get the Redis client
export function getRedisClient() {
  return redisClient;
}

// set key value for storing the mobile number for varification

export const setRedisValue = async (key: string, value: string, expiry: number) => {

  if (expiry <= 0) {
    // If expiry is 0 or less, delete the key
    await redisClient.del(key);
  } else {
    // Otherwise, set the key with expiry
    await redisClient.set(key, value, "EX", expiry);
  }
 
};

// verify the phone after sending the otp by phone number

export const getRedisValue = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};
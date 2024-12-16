import { Request, Response } from "express";
import { getRedisClient } from "../helper/redisConnection";
import { handleResponse } from "../utils/responseUtills";

// genrate OTP

export const genrateOTP = (length: number): string => {
  const defineOTP = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += defineOTP[Math.floor(Math.random() * defineOTP.length)];
  }
  console.log("otp....", otp);
  return otp;
};

// varify otp

export const varifyOTP = async (req: Request, res: Response) => {
  try {
    const redisClient = await getRedisClient();
    const storedOTP = await redisClient.get(req.body.phone);
    if (!storedOTP) {
      return handleResponse(
        res,
        400,
        "No OTP found by provided by this phone number "
      );
    }
    const savedExpireTime = await redisClient.ttl(req.body.email);
    if (savedExpireTime < 0) {
      return handleResponse(res, 400, "OTP has been expired ");
    }
    if (req.body.otp !== storedOTP) {
      return handleResponse(res, 400, "Invalid or incorrect OTP");
    }
    await redisClient.del(req.body.email);
    return handleResponse(res, 200, "OTP has been varified ");
  } catch (error) {
    handleResponse(res, 500, "Internal server error");
  }
};

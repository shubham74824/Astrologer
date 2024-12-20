import Astrologer from "../../models/adminSchema/astrologerModel";
import { setRedisValue, getRedisValue } from "../../helper/redisConnection";
import { sendSMS } from "../../helper/fast2SmsConnection";
import { genrateOTP } from "../otpService";
import { generateToken } from "../../utils/tokenUtills";
import { isAstrologer } from "../../models/adminSchema/astrologerModel";
import { Types } from "mongoose";
class AuthService {
  // save data and send otp

  static async registerAndSendOTP(userdata: any) {
    const { name, email, phone, experience, gender, city, country } = userdata;

    // Check if phone or email already exists
    const existingUser = await Astrologer.findOne({
      $or: [{ phone }, { email }],
    });
    if (existingUser) {
      return {
        statusCode: 400,
        message: "Email or Mobile number already exist",
      };
    }

    // Create and save a new astrologer record
    const newUser = new Astrologer({
      name,
      phone,
      email,
      gender,
      experience,
      city,
      country,
      isProfileCompleted: false,
      isAccountApprovedByAdmin: false,
    });

    await newUser.save();

    // Generate OTP and store it in Redis with a 2-minute expiration
    const otp = genrateOTP(6); // Generates a 6-digit OTP
    await setRedisValue(phone, otp, 120); // Expiration time in seconds

    // Send OTP via SMS
    await sendSMS(phone, `Your Astrologer OTP is ${otp}`);

    return { message: "User registered successfully. OTP sent to phone." };
  }
  //    varify OTP and send token

  static async verifyOTP(phone: string, otp: string) {
    //   fetch the stored otp and varified

    const storedOTP = await getRedisValue(phone);
    if (!storedOTP || storedOTP !== otp) {
      return { statusCode: 400, message: "Incorrect or expired otp" };
    }

    // Clear the OTP from Redis after successful verification
    await setRedisValue(phone, "", 0); // Set to empty with immediate expiration
    // After OTP is verified, find the user (astrologer) in the database
    const user = await Astrologer.findOne({ phone });
    if (!user) {
      return { statusCode: 404, message: "User not found" };
    }

    const typedUser = user as isAstrologer;
    // Ensure that _id is either ObjectId or string (as per your generateToken function requirements)
    const userId =
      typedUser._id instanceof Types.ObjectId
        ? typedUser._id.toString()
        : typedUser._id;

    // Generate tokens
    const { accessToken, refreshToken } = generateToken({ id: userId });

    return {
      statusCode: 200,
      message: "OTP verified successfully.",
      data: { accessToken, refreshToken },
    };
  }

  // login service 
  static async loginAstrologer(phone: string) {
    try {
      const findUser=await Astrologer.findOne({phone});
      if(!findUser){
        return {status:400,message:"No User found by this number"}
      };
      const sendOTP=await genrateOTP(6);
      await setRedisValue(phone, sendOTP, 120); // Expiration time in seconds

      // Send OTP via SMS
      await sendSMS(phone, `Your Astrologer OTP is ${sendOTP}`);
     
    } catch (error) {
      if (error instanceof Error) {
        return { status: 500, message: "Internal server error " };
      }
    }
  }

}

export default AuthService;

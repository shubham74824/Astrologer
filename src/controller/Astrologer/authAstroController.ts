import { Request, Response } from "express";
import AuthService from "../../services/astrologerService/authService";
import { handleResponse } from "../../utils/responseUtills";

class AuthController {
  // Register and send OTP
  static async registerAndSendOTP(req: Request, res: Response) {
    try {
      const { name, email, phone, experience, gender, city, country } =
        req.body;

      // Call the service to register user and send OTP
      const response = await AuthService.registerAndSendOTP({
        name,
        email,
        phone,
        experience,
        gender,
        city,
        country,
      });

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      handleResponse(res,500,"Server error. Please try again.")
      
    }
  }

  // Verify OTP and send token
  static async verifyOTP(req: Request, res: Response) {
    try {
      const { phone, otp } = req.body;

      // Validate OTP format and phone number (optional)
      if (!otp || otp.length !== 6) {
        handleResponse(res, 400, "Invalid OTP format.");
      }

      // Call the service to verify OTP
      const response = await AuthService.verifyOTP(phone, otp);

      if (response.statusCode !== 200) {
        handleResponse(res, 200, response.message);
      }

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      handleResponse(res,500,"Server error. Please try again.")
   
    }
  }
}

export default AuthController;

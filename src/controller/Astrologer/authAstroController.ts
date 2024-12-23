import { NextFunction, Request, Response } from "express";
import AuthService from "../../services/astrologerService/authService";
import { handleResponse } from "../../utils/responseUtills";
import { CustomRequest } from "../../types/customInterface";
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

  // verify LOGin

  static async loginController(req: Request, res: Response) {
    try {
      const { phone } = req.body;
      if (!phone) {
        handleResponse(res, 400, "Required filled missing ");
      }
      const response = await AuthService.loginAstrologer(phone);

      res
        .status(200)
        .json({ message: "OTP has been sent sucessfully", response });
    } catch (error) {
      handleResponse(res, 500, "internal Server Error");
    }
  }

  // get astrologerDetails
  static async getAstroDetails(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.astrologerId ;
     
      if (!userId) {
        handleResponse(res, 400, "User not authenticated ");

        return;
      }

      // Now, userId is guaranteed to be a string
      const user = await  AuthService.getAstroDetails(userId);

      if (user) {
        handleResponse(res, 200, "User details sucessfully", user);
        return;
      }

      handleResponse(res, 404, "User not found");
      return;
    } catch (error) {
      if (error instanceof Error) {
        return handleResponse(res, 500, "Internal Server Error");
      }
    }
  }

  // get list of all astrollofer register 

  static async getAllAstrologers(req: Request, res: Response) {
    try {
      const response = await AuthService.getAllAstrologers();
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error("Error in getAllAstrologers:", error);
      handleResponse(res, 500, "Internal server error");
    }
  }

  // Get astrologer by ID
  static async getAstrologerById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return handleResponse(res, 400, "Astrologer ID is required");
      }

      const response = await AuthService.getAstrologerById(id);
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error("Error in getAstrologerById:", error);
      handleResponse(res, 500, "Internal server error");
    }
  }
}

export default AuthController;

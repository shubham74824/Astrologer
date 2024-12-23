import { NextFunction, Request, Response } from "express";
import { handleResponse } from "../../utils/responseUtills";
import UserService from "../../services/userService/userService";
import { CustomRequest } from "../../types/customInterface";
class authUserController {
  // Register user controller
  static async registerUser(req: Request, res: Response) {
    try {
      const { name, phone } = req.body;
      const response = await UserService.registerAndSendOTP({
        name,
        phone,
      });
      res.status(200).json(response);
    } catch (error) {
      handleResponse(res, 500, "Internal server error");
    }
  }

  // User Login
  // Verify OTP and send token
  static async verifyOTP(req: Request, res: Response) {
    try {
      const { phone, otp } = req.body;

      // Validate OTP format and phone number (optional)
      if (!otp || otp.length !== 6) {
        handleResponse(res, 400, "Invalid OTP format.");
      }

      // Call the service to verify OTP
      const response = await UserService.verifyOTP(phone, otp);

      if (response.statusCode !== 200) {
        handleResponse(res, 200, response.message);
      }

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      handleResponse(res, 500, "Server error. Please try again.");
    }
  }

  // verify LOGin

  static async loginController(req: Request, res: Response) {
    try {
      const { phone } = req.body;
      if (!phone) {
        handleResponse(res, 400, "Required filled missing ");
      }
      const response = await UserService.loginAstrologer(phone);

      res
        .status(200)
        .json({ message: "OTP has been sent sucessfully", response });
    } catch (error) {
      handleResponse(res, 500, "internal Server Error");
    }
  }

  //   regrenrate OTP
  static async regenerateOTP(req: Request, res: Response) {
    try {
      const { phone } = req.body;

      if (!phone) {
        return handleResponse(res, 400, "Phone number is required.");
      }

      const response = await UserService.regenerateOTP(phone);

      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error("Error in regenerateOTP:", error);
      handleResponse(res, 500, "Internal server error.");
    }
  }

  //   get User Details
  static async getUserDetails(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.userId;

      if (!userId) {
        handleResponse(res, 400, "User not authenticated ");

        return;
      }

      // Now, userId is guaranteed to be a string
      const user = await UserService.getUserById(userId);
      console.log("userData...", user);
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
}

export default authUserController;

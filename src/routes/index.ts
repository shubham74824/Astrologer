import AuthController from "../controller/Astrologer/authAstroController";
import express, { Router } from "express";

const router: Router = express.Router();

// phone number varification Route 

// Register and send OTP
router.post("/registerAstrologer", AuthController.registerAndSendOTP);

// Verify OTP
router.post("/verify-otp", AuthController.verifyOTP);

export default router 
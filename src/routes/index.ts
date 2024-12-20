import AuthController from "../controller/Astrologer/authAstroController";
import express, { Router } from "express";
import { getAllMatchingDataController } from "../controller/vedicAstroController/matchMakingController";
const router: Router = express.Router();

// phone number varification Route 

router.get("/",(req:any,res:any)=>{
    return res.json({message:"Working"})
})

// Register and send OTP
router.post("/registerAstrologer", AuthController.registerAndSendOTP);

// Verify OTP
router.post("/verify-otp", AuthController.verifyOTP);


router.post("/getAllMatching",getAllMatchingDataController)

export default router 
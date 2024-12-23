import AuthController from "../controller/Astrologer/authAstroController";
import authUserController from "../controller/user/authUserController";
import express, { Router } from "express";
import { getAllMatchingDataController } from "../controller/vedicAstroController/matchMakingController";
const router: Router = express.Router();
import { astrologerAuth } from "../middleware/astrologerAuth";
import { userAuthenticate } from "../middleware/userAuth";
// phone number varification Route 

router.get("/",(req:any,res:any)=>{
    return res.json({message:"Working"})
})

// Register and send OTP
router.post("/registerAstrologer", AuthController.registerAndSendOTP);

// Verify OTP
router.post("/verify-otp", AuthController.verifyOTP);

// login Astrologer
router.post("/loginAstrologer",AuthController.loginController)
// vedic matchMaking
router.post("/getAllMatching",getAllMatchingDataController)

// profile details

router.get('/astroDetailsDetails',astrologerAuth,AuthController.getAstroDetails)


// Route to get all astrologers
router.get("/astrologers", AuthController.getAllAstrologers);

// Route to get astrologer by ID
router.get("/astrologers/:id", AuthController.getAstrologerById);


// user section

router.post("/registerUser",authUserController.registerUser);

router.post("/verifyUser",authUserController.verifyOTP)

router.post("/loginUser",authUserController.loginController)

router.post("/regenrateOTP",authUserController.regenerateOTP)

// user profile details
router.get("/userDetails",userAuthenticate,authUserController.getUserDetails)

export default router 
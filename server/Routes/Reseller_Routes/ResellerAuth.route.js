import express from "express";
import {
  Register,
  Login,
  LogOut,
  SendVerifyOTP,
  VerifyEmail,
  IsAuthenticated,
  SendResetOTP,
  ResetPassword,
  GetUserData
} from "../../Controllers/Reseller_Controllers/ResellerAuth.controller.js";
import { ResellerUserAuth } from "../../Middleware/User.js";
let router = express.Router();

router.post("/register", Register);
router.get("/register",ResellerUserAuth, GetUserData);
router.post("/login", Login);
router.post("/logout", LogOut);
router.post("/send-verify-otp", ResellerUserAuth, SendVerifyOTP);
router.post("/verify-account", ResellerUserAuth, VerifyEmail);
router.get("/is-auth", ResellerUserAuth, IsAuthenticated);
router.post("/send-reset-otp", SendResetOTP);
router.post("/reset-password", ResetPassword);

export default router;

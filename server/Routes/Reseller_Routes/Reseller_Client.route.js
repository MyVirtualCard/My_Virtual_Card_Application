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
} from "../../Controllers/Reseller_Controllers/Reseller_Client.controller.js";
import { ResellerClientsUserAuth } from "../../Middleware/User.js";
let router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", LogOut);
router.post("/send-verify-otp", ResellerClientsUserAuth, SendVerifyOTP);
router.post("/verify-account", ResellerClientsUserAuth, VerifyEmail);
router.get("/is-auth", ResellerClientsUserAuth, IsAuthenticated);
router.post("/send-reset-otp", SendResetOTP);
router.post("/reset-password", ResetPassword);
export default router;

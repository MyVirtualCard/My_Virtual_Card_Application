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
} from "../Controllers/UserAuth.controller.js";
import { UserAuth } from "../Middleware/User.js";
let router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", LogOut);
router.post("/send-verify-otp", UserAuth, SendVerifyOTP);
router.post("/verify-account", UserAuth, VerifyEmail);
router.get("/is-auth", UserAuth, IsAuthenticated);
router.post("/send-reset-otp", SendResetOTP);
router.post("/reset-password", ResetPassword);
export default router;

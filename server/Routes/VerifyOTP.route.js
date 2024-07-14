import express from "express";
import User_OTP_VerifyModel from "../Models/UserOTPVerify.model.js";
import bcrypt from "bcrypt";
import UserAuth from "../Models/Register.model.js";
let router = express.Router();

router.post("/verifyOTP", async (req, res) => {
  try {
    let { userName, OTP } = req.body;
    if (!userName || !OTP) {
      res.status(400).json({ message: "Empty userName or OTP are not been allowed! " });
    } else {
      const userOTPVerificationRecord = await User_OTP_VerifyModel.find({
        userName,
      });

      if (userOTPVerificationRecord.length <= 0) {
        res.status(400).json({ message: "No OTP record found! " });
      } else {
        const { expiredAt } = userOTPVerificationRecord[0];
        const hashedOTP = userOTPVerificationRecord[0].OTP;

        if (expiredAt < Date.now()) {
          await User_OTP_VerifyModel.deleteMany({ userName });
          // await UserAuth.deleteMany({_id:userId})
          res
            .status(400)
            .json({ message: "OTP has been expired!.Please Request Again.. " });
        } else {
          const validOTP = await bcrypt.compare(OTP, hashedOTP);

          if (!validOTP) {
            res.status(400).json("Invalid OTP...Check your Inbox..");
          } else {
            await UserAuth.updateOne({ userName: userName }, { verified: true });
            await User_OTP_VerifyModel.deleteMany({ userName });
            res.status(200).json({
              status: "VERIFIED",
              message: "OTP Verified Successfully.. ",
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
});


export default router;
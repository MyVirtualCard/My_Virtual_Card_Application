
import Reseller_ClientModel from "../../Models/Reseller_Models/Reseller_Client.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../../config/nodemailer.js";

//Register
export const Register = async (req, res) => {
  try {
    let { ResellerName,UserName, FullName, Email, MobileNumber, Password, Terms } = req.body;
    if (!UserName || !Email || !Password || !FullName) {
      return res.json({ success: false, message: "Missing Details" });
    }
    let ExistingUser = await Reseller_ClientModel.findOne({ UserName });

    if (ExistingUser) {
      return res.json({ success: false, message: "UserName Already Exist" });
    }

    let ExistingEmail = await Reseller_ClientModel.findOne({ Email });

    if (ExistingEmail) {
      return res.json({ success: false, message: "Email Already Exist" });
    }

    let hashedPassword = await bcrypt.hash(Password, 10);
    let NewUser = new Reseller_ClientModel({
      Reseller:true,
      ResellerName:ResellerName,
      UserName,
      Email,
      Password: hashedPassword,
      FullName,
      MobileNumber,
      Terms,
    });
    let savedUser = await NewUser.save();
    let token = jwt.sign(
      { id: savedUser._id, UserName: savedUser.UserName },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    //Sending Welcome Email

    let mailOption = {
      from: process.env.SENDER_EMAIL,
      to: savedUser.Email,
      subject: "Welcome to MyVirtualCard",
      text: `
         <div style="font-family: Arial, sans-serif; color: #fff; padding:5px 10px; border-radius:0.5rem; background-color:#000">
         <h1 style="letter-spacing:1px">Hi, ${savedUser.FullName}</h1>
        <h2 style="color: #fff;">Welcome to our service!</h2>
        <p style="color:#fff">
          We're excited to have you on board. Thank you for signing up.Your Account has been created with email id : ${savedUser.Email} . Get ready to explore amazing features and a seamless experience.
        </p>
        <a href="https://myvirtualcard.in/login">
           Login to Your Account
        </a>
        <p style="font-size: 12px; color: #777; margin-top: 20px;">
          If you didn't sign up for this account, please ignore this email or contact us.
        </p>
      </div>
      `,
    };

    await transporter.sendMail(mailOption);

    return res.json({ success: true, message: "Account Created...", token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//Login
export const Login = async (req, res) => {
  let { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.json({ success: false, message: "Email (or) Password Missing" });
  }
  try {
    let user = await Reseller_ClientModel.findOne({ Email });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }
    let isValidPassword = await bcrypt.compare(Password, user.Password);
    if (!isValidPassword) {
      return res.json({ success: false, message: "Invalid Password" });
    }
    let token = jwt.sign(
      { id: user._id, UserName: user.UserName },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });
    return res.json({ success: true, message: "Login Success", token: token });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
//Logout
export const LogOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//Send Verify OTP
export const SendVerifyOTP = async (req, res) => {
  try {
    let { userId } = req.body;

    let ExistUser = await Reseller_ClientModel.findById(userId);

    if (ExistUser.isAccountVerified) {
      return res.json({
        success: false,
        message: "Your Account Already Verified!",
      });
    }

    let OTP = Math.floor(10000 + Math.random() * 900000).toString();

    ExistUser.VerifyOTP = OTP;
    ExistUser.VerifyOTPExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await ExistUser.save();
    //Sending OTP Email
    let mailOption = {
      from: process.env.SENDER_EMAIL,
      to: ExistUser.Email,
      subject: "Account Verification OTP",
      text: `
          
           <div class="email-container" style="max-width: 600px;margin: 50px auto;background: #fff;padding: 20px;border-radius: 8px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)">
    <div class="header" style="text-align:center;padding: 20px 0">
      <h1 style="font-size: 24px;margin: 0;color: #4169E1">Verify Your Account</h1>
    </div>
    <div class="message" style="color:#000">
      <p>Hello ${ExistUser.FullName},</p>
      <p>Use the following OTP to complete your verification process. The OTP is valid for the next 24 hour.</p>
    </div>
    <div class="otp-box" style="font-size: 28px;font-weight: bold;color: #8EB486;text-align: center;margin: 20px 0;padding: 15px;background: #f9f9f9;border: 1px dashed #8EB486;border-radius: 8px;">${OTP}</div>
    <div class="message"style="font-size: 16px;line-height: 1.6;text-align: center;color: #000;">
      <p>Verify Your Account using this OTP.If you didn’t request this, please ignore this email.</p>
    </div>
    <div class="footer"style="text-align: center;margin-top: 30px;font-size: 14px;color: #888888;">
      <p>Thank you for using our service!</p>
      <p>&copy; 2024 Aristostech India Private Limited. All rights reserved.</p>
    </div>
  </div>
        `,
    };

    await transporter.sendMail(mailOption);
    return res.json({
      success: true,
      message: "Verification OTP sent on Email",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Verify Email

export const VerifyEmail = async (req, res) => {
  let { userId, OTP } = req.body;
  if (!userId || !OTP) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    let ExistUser = await Reseller_ClientModel.findById(userId);

    if (!ExistUser) {
      return res.json({ success: false, message: "User Not Found!" });
    }
    if (ExistUser.VerifyOTP === "" || ExistUser.VerifyOTP !== OTP) {
      return res.json({ success: false, message: "Invalid OTP!" });
    }
    if (ExistUser.VerifyOTPExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired!" });
    }

    ExistUser.isAccountVerified = true;
    ExistUser.VerifyOTP = "";
    ExistUser.VerifyOTPExpireAt = 0;

    await ExistUser.save();
    return res.json({
      success: true,
      message: "Email Verified Successfully! ",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Check if user is Authenticated
export const IsAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ sucess: false, message: error.message });
  }
};
//Password reset OTP

export const SendResetOTP = async (req, res) => {
  const { Email } = req.body;

  if (!Email) {
    return res.json({ success: false, message: "Email is required!" });
  }
  try {
    const ExistUser = await Reseller_ClientModel.findOne({ Email });
    if (!ExistUser) {
      return res.json({ success: false, message: `User not found!` });
    }
    let OTP = Math.floor(10000 + Math.random() * 900000).toString();

    ExistUser.ResetOTP = OTP;
    ExistUser.ResetOTPExpireAt = Date.now() + 15 * 60 * 1000;
    await ExistUser.save();
    //Sending OTP Email
    let mailOption = {
      from: process.env.SENDER_EMAIL,
      to: ExistUser.Email,
      subject: "Password Reset OTP",
      text: `
         
          <div class="email-container" style="max-width: 600px;margin: 50px auto;background: #fff;padding: 20px;border-radius: 8px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)">
   <div class="header" style="text-align:center;padding: 20px 0">
     <h1 style="font-size: 24px;margin: 0;color: #4169E1">Reset Your Account Password</h1>
   </div>
   <div class="message" style="color:#000">
     <p>Hello ${ExistUser.FullName},</p>
     <p>Use the following OTP to reset your password. The OTP is valid for the next 15 minutes.</p>
   </div>
   <div class="otp-box" style="font-size: 28px;font-weight: bold;color: #8EB486;text-align: center;margin: 20px 0;padding: 15px;background: #f9f9f9;border: 1px dashed #8EB486;border-radius: 8px;">${OTP}</div>
   <div class="message"style="font-size: 16px;line-height: 1.6;text-align: center;color: #000;">
     <p>Use this OTP to proceed with re-setting your password.If you didn’t request this, please ignore this email.</p>
   </div>
   <div class="footer"style="text-align: center;margin-top: 30px;font-size: 14px;color: #888888;">
     <p>Thank you for using our service!</p>
     <p>&copy; 2024 Aristostech India Private Limited. All rights reserved.</p>
   </div>
 </div>
       `,
    };

    await transporter.sendMail(mailOption);
    return res.json({
      success: true,
      message: "Reset OTP sent to your Email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Reset User Password

export const ResetPassword = async (req, res) => {
  const { Email, OTP, NewPassword } = req.body;

  if (!NewPassword || !Email || !OTP) {
    return res.json({
      success: false,
      message: "Email,OTP and NewPassword is required!",
    });
  }
  try {
    let ExistUser = await Reseller_ClientModel.findOne({ Email });
    if (!ExistUser) {
      return res.json({ success: false, message: `User not found!` });
    }
    if (ExistUser.ResetOTP === "" || ExistUser.ResetOTP !== OTP) {
      return res.json({ success: false, message: `Invalid OTP!` });
    }
    if (ExistUser.ResetOTPExpireAt < Date.now()) {
      return res.json({ success: false, message: `OTP Expired!` });
    }
    let hashedPassword = await bcrypt.hash(NewPassword, 10);

    ExistUser.Password = hashedPassword;
    ExistUser.ResetOTP = "";
    ExistUser.ResetOTPExpireAt = 0;

    ExistUser.save();
    return res.json({
      success: true,
      message: "New Password Created!",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

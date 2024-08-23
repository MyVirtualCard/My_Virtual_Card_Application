import UserAuth from "../Models/Register.model.js";
import bcryptjs from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt, { decode } from "jsonwebtoken";
import nodemailer from "nodemailer";
import mailgen from "mailgen";
// import generateOTP from "../Helper/Mail.js";
import User_OTP_VerifyModel from "../Models/UserOTPVerify.model.js";
import fast2sms from "fast-two-sms";
import unirest from "unirest";
import axios from "axios";
const lastSent = {};
let OTP = `${ Math.floor(100000 + Math.random() * 900000)}`;
// Function to send OTP via Fast2SMS
async function sendOTP(mobileNumber, message,senderId = 'AST') {
  try {
    const currentTime = Date.now();
    const lastSentTime = lastSent[mobileNumber] || 0;
    const timeElapsed = currentTime - lastSentTime;
  
    if (timeElapsed < 60000) { // 60 seconds delay
      console.log('Please wait before requesting a new OTP.');
      return;
    };
    const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization:process.env.FAST2SMS_API_KEY, // Replace with your Fast2SMS API key
        message: message,
        language: "english",
        variables_values: OTP, // OTP code, purely numeric
      route: "otp",
        numbers: mobileNumber,
        sender_id: senderId // Custom banner title (max 6 characters)
      },
      headers: {
        "cache-control": "no-cache",
      },
    });

    console.log("OTP sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
}

//Post data to mongodb -- > Register User  :
export const RegisterUser = async (req, res) => {
  try {
    //Get all those field data from body:
    let {
      profile,
      email,
      userName,
      password,
      firstName,
      lastName,
      mobileNumber,
      location,
      verified,
    } = req.body;
    //if user doesn't fill all those fields error through:
    if (
      !req.body.userName ||
      !req.body.firstName ||
      !req.body.password ||
      !req.body.mobileNumber||
      !req.body.email
    ) {
      res.status(400).json({ message: "All * fields Mandatory!" });
    } else {
      let userNameVerify = await UserAuth.findOne({ userName: userName });
      if (userNameVerify) {
        return res
          .status(400)
          .json({ message: "This UserName Already Exist!" });
      };
      let mobileNumberVerify = await UserAuth.findOne({ mobileNumber: mobileNumber });
      if (mobileNumberVerify) {
        return res
          .status(400)
          .json({ message: "MobileNumber  Already Exist!" });
      };

      //Find user Already Exist with this email or not
      let findUser = await UserAuth.findOne({ email: email });
      //If exist through on error
      if (findUser) {
        res
          .status(400)
          .json({ message: "User Already Exist with this email!" });
      } else {
        //Hashing password encrypt to secure clients passwords :
        let hashedPassword = await bcryptjs.hash(password, 10);
        let data = {
          profile,
          email,
          userName,
          password: hashedPassword, //Password stored secure with hashing type
          firstName,
          lastName,
          mobileNumber,
          location,
          verified: false,
        };
        // Generate OTP
        // const otp = generateOTP();

        let createUser = new UserAuth(data);

        await createUser
          .save()
          .then((result) => {
            SendOtpVerificationEmail(result, res);
          })
          .catch((error) => {
            res.status(400).json({
              status: "FAILED!",
              message: "OTP Sending Failed",
              error: error.message,
            });
          });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const ResendOTP = async (req, res) => {
  try {
    let { userName, mobileNumber } = req.body;

    if (!userName || !mobileNumber) {
      res.status(400).json({ message: "Please Provide All Details!" });
    } else {
      await User_OTP_VerifyModel.deleteMany({ userName });
      SendOtpVerificationEmail({ userName: userName, mobileNumber }, res);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const ForgotPassword = async (req, res) => {
  let { email } = req.body;
  try {
    if (!req.body.email) {
      res.status(401).json({ message: "Enter Your Email!" });
    } else {
      let checkUser = await UserAuth.findOne({ email: email });

      if (!checkUser) {
        res
          .status(401)
          .json({ message: "User Doesn't Exist with this Email!" });
      } else {
        const token = jwt.sign({ id: checkUser._id }, process.env.SECRET_KEY, {
          expiresIn: "30d",
        });

        let NavigateLink = `${checkUser._id}/${token}`;
         let Id=checkUser._id;
         let Token=token
        res
          .status(201)
          .json({ message: "Create Your New Password!",data:NavigateLink });

       
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Reset Password post new password:
export const ResetPassword = async (req, res) => {
  let { id, token } = req.params;

  let { password } = req.body;
  try {
    if (!req.body.password) {
      res.status(401).json({ message: "Enter Your Password!" });
    } else {
      token = jwt.verify(
        token,
        process.env.SECRET_KEY,
        async (error, decode) => {
          if (error) {
            res.status(401).json({ message: "Token Error" });
          } else {
            let HashPassword = bcryptjs.hashSync(password, 10);
            let checkUser = await UserAuth.findByIdAndUpdate(
              { _id: id },
              { password: HashPassword }
            );
            res
              .status(201)
              .json({ message: "New Password Created!", data: checkUser });
          
          }
        }
      );
    }
  } catch (error) {
  console.log(error)
    res.status(500).json({ message: error.message });
  }
};
//Fetch data from mongodb -- > Get all Registered User Data  :
export const ReadRegisteredUserAllData = async (req, res) => {
  try {
    let findUser = await UserAuth.find({});
    //If exist through on error
    if (findUser) {
      res
        .status(200)
        .json({ message: "All User data Fetched", data: findUser });
    } else {
      res.status(400).json({ message: "All User data Fetched Failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Fetch data from mongodb -- > Get Specific Registered User Data  :
export const ReadRegisteredUserSpecificData = async (req, res) => {
  try {
    let { userName } = req.params;
    //Find user Already Exist with this email or not
    let findUser = await UserAuth.findOne({ userName });
    //If exist through on error
    if (findUser) {
      res.status(200).json({ message: "User data Fetched", data: findUser });
    } else {
      res.status(400).json({ message: "User data Fetched Failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Update data to mongodb -- > Upate Specific Registered User Data  :
export const UpdateRegisteredUserSpecificData = async (req, res) => {
  try {
    let { id } = req.params;
    //Get all those field data from body:
    let { profile, email, location, firstName, lastName, mobileNumber } =
      req.body;
    let data = req.body;
    //If doesn't exist created new user data to database:
    let RegisterData = await UserAuth.findByIdAndUpdate(id, data);
    res.status(201).json({
      message: "Profile Updated Sucessfully",
      data: RegisterData,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Profile Updating Failed", error: error.message });
  }
};
//Update data to mongodb -- > Upate Specific Registered User Data  :
export const DeleteRegisteredUserSpecificData = async (req, res) => {
  try {
    let { id } = req.params;
    //If doesn't exist created new user data to database:
    await UserAuth.findByIdAndDelete(id);
    res.status(201).json({
      message: "Profile Deleted Sucessfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Profile Deleted Failed", error: error.message });
  }
};

//Send otp verification email:
const SendOtpVerificationEmail = async (
  { _id, email, userName, firstName, mobileNumber },
  res
) => {
  try {

    // let OTP = `${ Math.floor(100000 + Math.random() * 900000)}`;
    const senderId = 'AST'; // Replace with your approved sender ID
    // Send OTP
    await sendOTP(
      mobileNumber,
      `Hello ${userName} , Welcome to myvirtualcard.in application.Your have been registered Successfully .Your Verification OTP is - ${OTP} .. Expired After 5-Minutes`,senderId
    );
    let hashedOTP = await bcryptjs.hash(OTP, 10);
    let saveOTP = new User_OTP_VerifyModel({
      userId: _id,
      userName: userName,
      OTP: hashedOTP,
      createdAt: Date.now(),
      expiredAt: Date.now() + 300000, // 5 minutes expire from now

    });
    let SavedOTP = await saveOTP.save();
    //Checking for already this email exist or not:
    let checkUser = await UserAuth.findOne({ userName });
    if (!checkUser) {
      return res.status(400).json({ message: `UserName Doesn't Exist!` });
      // throw new Error ("User Doesn't Exist" );
    }
    // //Create token for specific user:
    let token = jwt.sign(
      {
        id: checkUser.id,
        email: checkUser.email,
        name: checkUser.firstName,
        userName: checkUser.userName,
        verified:checkUser.verified
      }, //Token payload stored our  data
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );
    //Token verify:
    if (!token) {
      return res.status(400).json({ message: "Token not found " });
    }

    res.status(201).json({
      status: "PENDING",
      message: "Verification OTP Sended On Your MobileNumber!",
      OTP: OTP,
      data: SavedOTP,
      token: token,
      id: checkUser.id,
      userName: checkUser.userName,
      name: checkUser.firstName,
      mobileNumber:checkUser.mobileNumber
    });

  } catch (error) {
    return res.status(400).json({
      status: "FAILED!",
      message: "OTP Sending Failed",
      error: error.message,
    });
  }
};

import User from "../Model/User.js";
import bcryptjs from "bcrypt";
import axios from "axios";
import jwt from "jsonwebtoken";
import User_OTP_VerifyModel from "../Model/Verify_OTP.model.js";
const lastSent = {};
let OTP = `${Math.floor(100000 + Math.random() * 900000)}`;
// Function to send OTP via Fast2SMS
async function sendOTP(mobileNumber, message, senderId = "AST") {
  try {
    const currentTime = Date.now();
    const lastSentTime = lastSent[mobileNumber] || 0;
    const timeElapsed = currentTime - lastSentTime;

    if (timeElapsed < 60000) {
      // 60 seconds delay
      console.log("Please wait before requesting a new OTP.");
      return;
    }
    const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.FAST2SMS_API_KEY, // Replace with your Fast2SMS API key
        message: message,
        language: "english",
        variables_values: OTP, // OTP code, purely numeric
        route: "otp",
        numbers: mobileNumber,
        sender_id: senderId, // Custom banner title (max 6 characters)
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
//Create New User:
export const PostUserData = async (req, res) => {
  //Get all those field data from body:
  let {
    email,
    userName,
    password,
    firstName,
    lastName,
    mobileNumber,
    location,
  } = req.body;

  //if user doesn't fill all those fields error through:
  if (
    !req.body.userName ||
    !req.body.firstName ||
    !req.body.password ||
    !req.body.mobileNumber ||
    !req.body.email
  ) {
    res.status(400).json({ message: "All * fields Mandatory!" });
  } else {
    // if (!req.file || req.file) {
    //   return res.status(400).send("No file uploaded.");
    // }
    let userNameVerify = await User.findOne({ userName: userName });
    if (userNameVerify) {
      return res.status(400).json({ message: "This UserName Already Exist!" });
    }

    let mobileNumberVerify = await User.findOne({ mobileNumber: mobileNumber });
    if (mobileNumberVerify) {
      return res.status(400).json({ message: "MobileNumber  Already Exist!" });
    }

    //Find user Already Exist with this email or not
    let findUser = await User.findOne({ email: email });
    //If exist through on error
    if (findUser) {
      res.status(400).json({ message: "User Already Exist with this email!" });
    } else {
      //Hashing password encrypt to secure clients passwords :
      let hashedPassword = await bcryptjs.hash(password, 10);
      let data = {
        profile: {
          filename: req.file?.filename,
          contentType: req.file?.mimetype,
          imageBase64: req.file?.path,
        },
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

      let createUser = new User(data);

      await createUser
        .save()
        .then((result) => {
          SendOtpVerificationMobileNumber(result, res);
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
};
//Get Specific User Data with UserName
//Fetch data from mongodb -- > Get Specific Registered User Data  :
export const ReadRegisteredUserSpecificData = async (req, res) => {
  try {
    let { userName } = req.params;
    //Find user Already Exist with this email or not
    let userData = await User.findOne({ userName });
    //If exist through on error
    if (userData) {
      res.status(200).json({ message: "User data Fetched", data: userData });
    } else {
      res.status(400).json({ message: "User data Fetched Failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const GetUserData = async (req, res) => {
  let UserData = await User.find({});

  res.json({ message: "Fetched", UserData });
};
//Update data to mongodb -- > Upate Specific Registered User Data  :
export const UpdateRegisteredUserSpecificData = async (req, res) => {
  try {
    let { id } = req.params;
    let data = {
      profile: {
        filename: req.file?.filename,
        contentType: req.file?.mimetype,
        imageBase64: req.file?.path,
      },
      email: req.body.email,
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobileNumber: req.body.mobileNumber,
      location: req.body.location,
    };
    //If doesn't exist created new user data to database:
    let RegisterData = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
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
export const ResendOTP = async (req, res) => {
  try {
    let { userName, mobileNumber } = req.body;

    if (!userName || !mobileNumber) {
      res.status(400).json({ message: "Please Provide All Details!" });
    } else {
      await User_OTP_VerifyModel.deleteMany({ userName });
      SendOtpVerificationMobileNumber(
        { userName: userName, mobileNumber },
        res
      );
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Send otp verification MobileNumber:
const SendOtpVerificationMobileNumber = async (
  { _id, email, userName, firstName, mobileNumber },
  res
) => {
  try {
    // let OTP = `${ Math.floor(100000 + Math.random() * 900000)}`;
    const senderId = "AST"; // Replace with your approved sender ID
    // Send OTP
    await sendOTP(
      mobileNumber,
      `Hello ${userName} , Welcome to myvirtualcard.in application.Your have been registered Successfully .Your Verification OTP is - ${OTP} .. Expired After 5-Minutes`,
      senderId
    );
    let hashedOTP = await bcryptjs.hash(OTP, 10);
    let saveOTP = new User_OTP_VerifyModel({
      userId: _id,
      userName: userName,
      OTP: hashedOTP,
      createdAt: Date.now(),
      expiredAt: Date.now() + 300000, // 3 minutes expire from now
    });
    let SavedOTP = await saveOTP.save();
    //Checking for already this email exist or not:
    let checkUser = await User.findOne({ userName });
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
        verified: checkUser.verified,
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
      mobileNumber: checkUser.mobileNumber,
    });
  } catch (error) {
    return res.status(400).json({
      status: "FAILED!",
      message: "OTP Sending Failed",
      error: error.message,
    });
  }
};

//Login user:
export const LoginUser = async (req, res) => {
  try {
    //Get value from body:
    let { mobileNumber, password } = req.body;
    //User required to fill all those fields:
    if (!mobileNumber || !password) {
      res.status(400).json({ message: "Fill all those * fields" });
    } else {
      //Checking for already this email exist or not:
      let checkUser = await User.findOne({ mobileNumber });
      if (!checkUser) {
        return res.status(400).json({ message: `MobileNumber Doesn't Exist` });
        // throw new Error ("User Doesn't Exist" );
      }
      if (checkUser.verified == false) {
        return res.status(400).json({ message: `Your Account Not Verified!` });
      }

      //Compare current password and already registered password with bcryptjs:
      let verifyPassword = await bcryptjs.compare(password, checkUser.password);
      if (!verifyPassword) {
        res.status(400).json({ message: "Wrong Credential " });
      } else {
        //Create token for specific user:
        let token = jwt.sign(
          {
            id: checkUser.id,
            mobileNumber: checkUser.mobileNumber,
            email: checkUser.email,
            name: checkUser.firstName,
            userName: checkUser.userName,
          }, //Token payload stored our  data
          process.env.SECRET_KEY,
          { expiresIn: "30d" }
        );
        //Token verify:
        if (!token) {
          res.status(400).json({ message: "Token not found " });
        }

        //Token Store to local Strorage:
        res.status(200).json({
          token: token,
          id: checkUser.id,
          mobileNumber: checkUser.mobileNumber,
          userName: checkUser.userName,
          name: checkUser.firstName,
          message: "User Login Sucessfully ",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "User Login Failed", error: error.message });
  }
};

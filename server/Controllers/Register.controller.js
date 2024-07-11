import UserAuth from "../Models/Register.model.js";
import bcryptjs from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt, { decode } from "jsonwebtoken";
import nodemailer from "nodemailer";
import mailgen from "mailgen";
import generateOTP from "../Helper/Mail.js";
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
    } = req.body;
    //if user doesn't fill all those fields error through:
    if (
      !req.body.userName ||
      !req.body.firstName ||
      !req.body.email ||
      !req.body.password
    ) {
      res.status(400).json({ message: "All * fields Mandatory!" });
    } else {
      let userNameVerify = await UserAuth.findOne({ userName: userName });
      if (userNameVerify) {
        return res
          .status(400)
          .json({ message: "This UserName Already Exist!" });
      }
      //Find user Already Exist with this email or not
      let findUser = await UserAuth.findOne({ email: email });
      //If exist through on error
      if (findUser) {
        return res
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
        };
        //If doesn't exist created new user data to database:
        let createUser = new UserAuth(data);

        const transporter = nodemailer.createTransport({
          service: "SMPT",
          host: process.env.SMTP_HOST, // Correctly specify the SMTP host
          port: process.env.SMTP_PORT, // Use 465 for SSL or 587 for TLS
          secure: true, // Use true for 465, false for other ports
          auth: {
            user: process.env.GMAIL, // your Gmail address
            pass: process.env.GMAIL_PASSWORD, // your Gmail password
          },
          logger: true, // Add this line
          debug: true,  // Add this line
        });

        let message = {
          from: `AristosTech India Private Ltd <${process.env.GMAIL}>`, // sender address
          to: `${createUser.email}`, // list of receivers
          subject: "Welcome to MyVirtual VCard Application✔", // Subject line
          text: "You are Sucessfully Registered!", // plain text body
          html: `
          <h3>Hello,${createUser.firstName} &nbsp; ${createUser.lastName}</h3>
           <h2>Welcome to myvirtualcard</h2>
           <h4> Your Account has been Sucessfully Created with us!</h4>
          <p>A digital vCard, or virtual business card, is a modern alternative to traditional paper business cards. It contains essential contact information such as name, job title, company name, phone number, email address, and more, all stored in a digital format.</p>
          <small><b>Visit Our Website</b> https://myvirtualcard.in</small>
          `, // html body
        };

        // send mail with defined transport object
        transporter
          .sendMail(message)
          .then((info) => {
            return res.status(201).json({
              message: "Registered Sucessfully!",
              emailMessage: "You should Receive an Email..",
              info: info.messageId,
              preview: nodemailer.getTestMessageUrl(info),
              data: createUser,
            });
          })
          .catch((error) => {
            return res.status(500).json({ message: error.message });
          });
        await createUser.save();
     

        // res.status(201).json({
        //   message: "User Registered Sucessfully",
        //   data: createUser,
        // });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
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
        const transporter = nodemailer.createTransport({
          service: "SMPT",
          host: process.env.SMTP_HOST, // Correctly specify the SMTP host
          port: process.env.SMTP_PORT, // Use 465 for SSL or 587 for TLS
          secure: true, // Use true for 465, false for other ports
          auth: {
            user: process.env.GMAIL, // your Gmail address
            pass: process.env.GMAIL_PASSWORD, // your Gmail password
          },
          logger: true, // Add this line
          debug: true,  // Add this line
        });

        let message = {
          from: `AristosTech India Private Ltd <${process.env.GMAIL}>`, // sender address
          to: `${checkUser.email}`, // list of receivers
          subject: "Reset Your Password!", // Subject line
          text: "Create Your New Product Key!", // plain text body
          html: `
          <h3>Hello,${checkUser.firstName} &nbsp; ${checkUser.lastName}</h3>
          <p>If you forgot your old password u don't worry about it we will help you to update your new password with registered same email Addesss!</p>
          <small><b>Reset Your Password ?</b><a href='http://localhost:5173/reset_password/${checkUser._id}/${token}'>Click Here!</a></small>
          `, // html body
        };

        // send mail with defined transport object
        transporter
          .sendMail(message)
          .then(() => {
            res.status(201).json({ message: "Check your Registered Email Address!" });
          })
          .catch((error) => {
            return res.status(500).json({ message: error.message });
          });
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
            const transporter = nodemailer.createTransport({
              service: "SMPT",
              host: process.env.SMTP_HOST, // Correctly specify the SMTP host
              port: process.env.SMTP_PORT, // Use 465 for SSL or 587 for TLS
              secure: true, // Use true for 465, false for other ports
              auth: {
                user: process.env.GMAIL, // your Gmail address
                pass: process.env.GMAIL_PASSWORD, // your Gmail password
              },
            });

            let message = {
              from: `AristosTech India Private Ltd <${process.env.GMAIL}>`, // sender address
              to: `${checkUser.email}`, // list of receivers
              subject: "Password Updated!", // Subject line
              text: "Your New Password Created Sucessfully!", // plain text body
              html: `
          <h3>Hello,${checkUser.firstName} &nbsp; ${checkUser.lastName}</h3>
          <p>Your old password reseted sucessfully and updated your new password with your email address..Now you ready to login with latest new password..</p>
          <small><b>Ready to Login ?</b><a href='http://localhost:5173/login'>Click Here to Login!</a></small>
          `, // html body
            };

            // send mail with defined transport object
            transporter.sendMail(message).then(() => {
              res.status(201).json({ message: "New Password Created!" });
            });
          }
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    let { id } = req.params;
    //Find user Already Exist with this email or not
    let findUser = await UserAuth.findById(id);
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
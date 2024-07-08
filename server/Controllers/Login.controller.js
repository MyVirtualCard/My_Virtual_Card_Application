import UserAuth from "../Models/Register.model.js";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import axios from 'axios'
//Login user:
export const LoginUser = async (req, res) => {
    try {
      //Get value from body:
      let { email, password,capchaValue } = req.body;
      //User required to fill all those fields:
      if (!email || !password) {
        res.status(400).json({ message: "Fill all those * fields" });
      } else {
        //Checking for already this email exist or not:
        let checkUser = await UserAuth.findOne({ email });
        if (!checkUser) {
          res.status(400).json({message:`User Doesn't Exist`});
          // throw new Error ("User Doesn't Exist" );
        } else {
          //Compare current password and already registered password with bcryptjs:
          let verifyPassword = await bcryptjs.compare(
            password,
            checkUser.password
          );
          if (!verifyPassword) {
            res.status(400).json({ message: "Wrong Credential " }); 
          } else {
            //Create token for specific user:
            let token = jwt.sign(
              {
                id: checkUser.id,
                email: checkUser.email,
                name: checkUser.firstName,
                userName:checkUser.userName
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
              userName:checkUser.userName,
              name: checkUser.firstName,
              message: "User Login Sucessfully ",
            });
          }
        }
        // const response=await axios.post(`https://www.google.com/recaptcha/api/siteverify`,null,{
        //   params:{
        //     secret:'6LdlmuYpAAAAAC3FfLOpVtzNgRGL8l_kMWkpHp-B',
        //     response:capchaValue
        //   }
        //  })
        //  if(response.data.success){
        //   res.status(200).json({success:true,message:'CAPTCHA verified successfully'})
        //   }
        //   else{
        //    res.status(400).json({success:true,message:'CAPTCHA verified Failure'})
        //   }
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: "User Login Failed", error: error.message });
    }
  };
  
  //Forgot Password:

  export const forgotPassword=async(req,res)=>{

  };
  
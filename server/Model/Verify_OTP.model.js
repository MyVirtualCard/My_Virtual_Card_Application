import mongoose from "mongoose";

let OTPVerifySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userName:{
     type:String
    },
    OTP: {
      type: String,
    },
    createdAt:{
        type:Date
    },
    expiredAt:{
        type:Date
    }
  },

);



let User_OTP_VerifyModel=mongoose.model('VerifyOTP',OTPVerifySchema);
export default User_OTP_VerifyModel;
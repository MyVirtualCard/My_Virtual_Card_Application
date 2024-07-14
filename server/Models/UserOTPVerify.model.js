import mongoose from "mongoose";

let OTPVerifySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    OTP: {
      type: String,
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    }
  },

);



let User_OTP_VerifyModel=mongoose.model('OTPVerify',OTPVerifySchema);
export default User_OTP_VerifyModel;

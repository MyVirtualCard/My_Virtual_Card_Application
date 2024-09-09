import mongoose from "mongoose";

let UserShema = mongoose.Schema(
  {
    profile:{
      // filename: String,
      // contentType: String,
      // imageBase64: String,
      type: String,
     default:'https://img.freepik.com/premium-photo/round-circle-with-mans-head-circle-with-circle-middle_807814-680.jpg?w=740'
    },

    userName: {
      type: String,
      required: true
      
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
  
    },
    email: {
      type:String,
      required: true,
    },
    password: {
      type: String,
      required: true,

    },
    terms: {
      type: Boolean,
      default: false,
    },
    mobileNumber: {
      type:Number,
      required: true
    },
    location: {
      type: String,
    
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


let User=mongoose.model('User',UserShema);

export default User;
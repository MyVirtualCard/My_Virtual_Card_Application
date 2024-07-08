import mongoose from "mongoose";

let SocialMediaDetailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies:{
      type:String,
      required:true,
      unique:true
    },
    Website: {
      type: String,
    },
    Facebook: {
      type: String,
      // unique:true
    },
    LinkedIn: {
      type: String,
      // unique:true
    },
    WhatsUp: {
      type: String,
      required: true,
      // unique:true
    },
    Instagram: {
      type: String,
      // unique:true
    },
    Twiter: {
      type: String,
      // unique:true
    },
    YouTube: {
      type: String,
    },
    Github: {
      type: String,
    },
  },
  { timestamps: true }
);

let SocialMediaModel = mongoose.model(
  "SocialMediaDatas",
  SocialMediaDetailSchema
);

export default SocialMediaModel;

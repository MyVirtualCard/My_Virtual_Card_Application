import mongoose from "mongoose";

let Dynamic_Logo_Banner_Schema = new mongoose.Schema(
  {
    UserName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies: {
      type: String,
      required: true,
      unique: true,
    },
    BannerHeight: {
      type: Array,
      required: false,
    },
    BannerBrightness: {
      type: Array,
      required: false,
    },
    LogoWidth: {
      type: String,
      required: false,
    },
    LogoWidthUnit: {
      type: String,
      required: false,
    },
    LogoHeight: {
      type: String,
      required: false,
    },
    LogoHeightUnit: {
      type: String,
      required: false,
    },
    LogoBorderRadius: {
      type: String,
      required: false,
    },
    LogoBorderRadiusUnit: {
      type: String,
      required: false,
    },
    LogoPosition: {
      type: String,
      required: false,
    },
    LogoTopPosition: {
      type: String,
      required: false,
    },
    LogoLeftPosition: {
      type: String,
      required: false,
    },
    LogoImageAnimation:{
      type: String,
      required: false,
    },
    LogoPositionUnit: {
      type: String,
      required: false,
    },
  
  },
  { timestamps: true }
);
let Dynmaic_Logo_Banner_Model = mongoose.model(
  "Dynmaic_Logo_Banner_Details",
  Dynamic_Logo_Banner_Schema
);

export default Dynmaic_Logo_Banner_Model;

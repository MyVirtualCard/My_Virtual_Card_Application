import mongoose from "mongoose";

let Dynamic_Title_Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies: {
      type: String,
      required: true,
      unique: true,
    },
    TitleColor: {
      type: String,
      required: false,
    },
    TitleSize: {
      type: String,
      required: false,
    },
    TitleUnit: {
      type: String,
      required: false,
    },
    TitleFontWeight: {
      type: String,
      required: false,
    },
    TitleFont: {
      type: String,
      required: false,
    },
    TitlePosition: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
let Dynamic_Title_Model = mongoose.model(
  "Dynamic_Title_Details",
  Dynamic_Title_Schema
);

export default Dynamic_Title_Model;

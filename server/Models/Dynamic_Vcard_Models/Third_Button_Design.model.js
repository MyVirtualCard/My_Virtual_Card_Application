import mongoose from "mongoose";

let Dynamic_button_icon_Schema = new mongoose.Schema(
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
    BtnBackColour: {
      type: String,
      required: false,
    },
    BtnTextColour: {
      type: String,
      required: false,
    },
    BtnHoverColour: {
      type: String,
      required: false,
    },
    BtnHoverTextColour: {
      type: String,
      required: false,
    },
    ContactBtnBorderRadius: {
      type: String,
      required: false,
    },
    ContactBtnUnit: {
      type: String,
      required: false,
    },
    IconBorderRadius: {
      type: String,
      required: false,
    },
    IconUnit: {
      type: String,
      required: false,
    },
    UserDataPosition:{
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);
let Dynamic_Button_Icon_Model = mongoose.model(
  "Dynamic_Button_Icon_Details",
  Dynamic_button_icon_Schema
);

export default Dynamic_Button_Icon_Model;

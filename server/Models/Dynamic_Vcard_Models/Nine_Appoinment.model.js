import mongoose from "mongoose";

let Appoinment_Theme_Schema = new mongoose.Schema(
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
    AppoinmentInputDesign: {
      type: String,
      required: false,
    },
    LabelColor: {
      type: String,
      required: false,
    },
    InputBorderColor: {
      type: String,
      required: false,
    },
    InputBorderOnFocus: {
      type: String,
      required: false,
    },
    PlaceholderColor: {
      type: Array,
      required: false,
    },
    InputError: {
      type: Array,
      required: false,
    },
    InputColor: {
      type: String,
      required: false,
    },

   
  },
  { timestamps: true }
);
let AppoinmentThemeModel = mongoose.model(
  "Appoinment_Theme_Details",
  Appoinment_Theme_Schema);

export default AppoinmentThemeModel;

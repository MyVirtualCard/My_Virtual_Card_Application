import mongoose from "mongoose";

let Service_Theme_Schema = new mongoose.Schema(
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
    ServiceBackColor: {
      type: String,
      required: false,
    },
    ServiceTextColor: {
      type: String,
      required: false,
    },
    ServiceTitleColor: {
      type: String,
      required: false,
    },
    ServiceTitleFont: {
      type: String,
      required: false,
    },
    ServiceTitleSize: {
      type: String,
      required: false,
    },
    ServiceTitleUnit: {
      type: String,
      required: false,
    },
    ServiceFontWeight: {
      type: String,
      required: false,
    },
    ServiceTitleAlign: {
      type: String,
      required: false,
    },
    BtnBackColor: {
      type: String,
      required: false,
    },
    BtnTextColor: {
      type: String,
      required: false,
    },
    BtnHoverBackColor: {
      type: String,
      required: false,
    },
    BtnHoverTextColor: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
let ServiceThemeModel = mongoose.model(
  "ServiceThemeDetails",
  Service_Theme_Schema
);

export default ServiceThemeModel;

import mongoose from "mongoose";

let Product_Theme_Schema = new mongoose.Schema(
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
    ProductBackColor: {
      type: String,
      required: false,
    },
    ProductTextColor: {
      type: String,
      required: false,
    },
    ProductTitleColor: {
      type: String,
      required: false,
    },
    ProductTitleFont: {
      type: String,
      required: false,
    },
    ProductTitleSize: {
      type: String,
      required: false,
    },
    ProductTitleUnit: {
      type: String,
      required: false,
    },
    ProductFontWeight: {
      type: String,
      required: false,
    },
    ProductTitleAlign: {
      type: String,
      required: false,
    },
    ProductBtnBackColor: {
      type: String,
      required: false,
    },
    ProductBtnTextColor: {
      type: String,
      required: false,
    },
    ProductBtnHoverBackColor: {
      type: String,
      required: false,
    },
    ProductBtnHoverTextColor: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
let ProductThemeModel = mongoose.model(
  "ProductThemeDetails",
  Product_Theme_Schema
);

export default ProductThemeModel;

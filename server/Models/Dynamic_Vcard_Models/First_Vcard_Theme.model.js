import mongoose from "mongoose";

let Vcard_Theme_Schema = new mongoose.Schema(
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
    VCardColour: {
      type: String,
      required: false,
    },
    VCardTextColour: {
      type: String,
      required: false,
    },
    WebsiteBackgroundType: {
      type: String,
      required: false,
      default: "Background-Color",
    },
    WebsiteBackImageAddress: {
      type: String,
      required: false,
      default:
        "https://img.freepik.com/free-vector/modern-abstract-background_1048-1003.jpg?ga=GA1.1.111147909.1717157513&semt=ais_tags_boosted",
    },
    LinearGradient: {
      type: Boolean,
      default: false,
    },
    DesktopViewBackColor: {
      type: String,
      required: false,
    },
    DesktopViewBackColor2: {
      type: String,
      default: "#fff",
    },
    SVG_Design: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
let VcardThemeModel = mongoose.model("VcardThemeDetails", Vcard_Theme_Schema);

export default VcardThemeModel;

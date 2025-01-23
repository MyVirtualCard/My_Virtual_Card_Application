import mongoose from "mongoose";

let Testimonial_Theme_Schema = new mongoose.Schema(
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
    TestimonialBackColor: {
      type: String,
      required: false,
    },
    TestimonialTextColor: {
      type: String,
      required: false,
    },
    TestimonialTitleColor: {
      type: String,
      required: false,
    },
    TestimonialClientNameColor: {
      type: String,
      required: false,
    },
    TestimonialBorderRadius: {
      type: Array,
      required: false,
    },
    TestimonialImageBorderRadius: {
      type: Array,
      required: false,
    },
    FlexDirection: {
      type: String,
      required: false,
    },
    UserDataFlexDirection: {
      type: String,
      required: false,
    },
    UserDataJustifyContent: {
      type: String,
      required: false,
    },
    UserDataAlignItems: {
      type: String,
      required: false,
    }
   
  },
  { timestamps: true }
);
let TestimonialThemeModel = mongoose.model(
  "TestimonialThemeDetails",
  Testimonial_Theme_Schema);

export default TestimonialThemeModel;

import mongoose from "mongoose";

let Feedback_Theme_Schema = new mongoose.Schema(
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
    FeedbackInputDesign: {
      type: String,
      required: false,
    },
    FeedbackLabelColor: {
      type: String,
      required: false,
    },
    FeedbackInputBorderColor: {
      type: String,
      required: false,
    },
    FeedbackInputBorderOnFocus: {
      type: String,
      required: false,
    },
    FeedbackPlaceholderColor: {
      type: Array,
      required: false,
    },
    FeedbackInputError: {
      type: Array,
      required: false,
    },
    FeedbackInputColor: {
      type: String,
      required: false,
    },

   
  },
  { timestamps: true }
);
let FeedbackThemeModel = mongoose.model(
  "Feedback_Theme_Details",
  Feedback_Theme_Schema);

export default FeedbackThemeModel;

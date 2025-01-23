import mongoose from "mongoose";

let Dynamic_Timer_Theme_Schema = new mongoose.Schema(
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
    TimerBackColour: {
      type: String,
      required: false,
    },
    TimerTitleColor: {
      type: String,
      required: false,
    },
    TimerSubTitleColor: {
      type: String,
      required: false,
    },
    TimerBoxBorderRadius: {
      type: Array,
      required: false,
    },
    TimerTextColour: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
let Dynamic_Timer_Theme_Model = mongoose.model(
  "Dynamic_Timer_Theme_Details",
  Dynamic_Timer_Theme_Schema
);

export default Dynamic_Timer_Theme_Model;

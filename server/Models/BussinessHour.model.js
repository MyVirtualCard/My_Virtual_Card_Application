import mongoose from "mongoose";

let BussinessSchema = new mongoose.Schema(
  {
    UserName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies: {
      type: String,
      required: true,
    },
    Monday: {
      from: String,
      to: String,
    },
    Tuesday: {
      from: String,
      to: String,
    },
    Wednesday: {
      from: String,
      to: String,
    },
    Thursday: {
      from: String,
      to: String,
    },
    Friday: {
      from: String,
      to: String,
    },
    Saturday: {
      from: String,
      to: String,
    },
    Sunday: {
      from: String,
      to: String,
    },
  },
  { timestamps: true }
);

let BussinessModel = mongoose.model("BussinessHour_Data", BussinessSchema);

export default BussinessModel;

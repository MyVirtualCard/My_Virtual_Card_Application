import mongoose from "mongoose";

let BankSchema = new mongoose.Schema(
  {
    UserName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies: {
      type: String,
      required: true,
    },
    HolderName: {
      type: String,
      required: true,
    },
    BankName: {
      type: String,
      required: true,
    },

    IFSCCode: {
      type: String,
      required: true,
    },
    AccountNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let BankModel = mongoose.model("BankDetails", BankSchema);
export default BankModel;

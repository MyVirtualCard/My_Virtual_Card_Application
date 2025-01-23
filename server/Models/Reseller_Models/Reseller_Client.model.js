import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
  Reseller: {
    type: String,
    default: false,
  },
  ResellerName:{
      type: String,
      default: null,
  },
  UserName: {
    type: String,
    required: true,
    unique: true,
  },
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  MobileNumber: {
    type: String,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Terms: {
    type: Boolean,
    default: false,
  },
  Location: {
    type: String,
    default: "Not Yet",
  },
  Paid: {
    type: Boolean,
    default: false,
  },
  Plan:{
    type: String,
    default: "No Plan"

  },
  Role: {
    type: String,
    default: "Reseller_Client",
  },
  VerifyOTP: {
    type: String,
    default: "",
  },
  VerifyOTPExpireAt: {
    type: Number,
    default: 0,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  ResetOTP: {
    type: String,
    default: "",
  },
  ResetOTPExpireAt: {
    type: Number,
    default: 0,
  },
});

let Reseller_ClientModel = mongoose.models.Reseller_Client_Data || mongoose.model("Reseller_Client_Data", UserSchema);

export default Reseller_ClientModel;

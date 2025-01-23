import mongoose from "mongoose";

let ResellerUserSchema = new mongoose.Schema({
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
    default: "Reseller",
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

let ResellerUserModel = mongoose.models.Reseller_User || mongoose.model("Reseller_User", ResellerUserSchema);

export default ResellerUserModel;

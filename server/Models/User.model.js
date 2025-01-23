import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
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
    default: "User",
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

let UserModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default UserModel;

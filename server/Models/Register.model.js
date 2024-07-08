import mongoose from "mongoose";

let RegisterSchema = new mongoose.Schema(
  {
    profile: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/bearded-man-profile_24908-81067.jpg?t=st=1711814101~exp=1711817701~hmac=e843296aecd64185b4bb0ec5fd1bd4ce00769b401064146757a1f0286dd2b862&w=740",
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    mobileNumber: {
      type: Number,
      default:'+91',
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

let UserAuth = mongoose.model("UserAuth", RegisterSchema);

export default UserAuth;

import mongoose from "mongoose";

let Vcard_URL_Schema = new mongoose.Schema(
  {
    UserName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // This will convert the value to lowercase before storing
      trim: true, // This removes any leading or trailing whitespace
    },
    VCardName: {
      type: String,
      required: true,
    },
    BussinessType:{
      type: String,
      required: false,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Profession: {
      type: String,
      required: true,
    },
    Profile: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/red-logo-black-background_1195-52.jpg?t=st=1723040744~exp=1723044344~hmac=8957c7841606fcccd1da5549120aead8a75bdac9544c7484c2193bc6caf2298e&w=740",
      // required:true
    },
    Banner: {
      type: String,
      default:
        "https://img.freepik.com/free-photo/cement-wall-floor-copy-space_53876-30237.jpg?t=st=1716040667~exp=1716044267~hmac=37c1f0faf9137d781a0aa0d1436b486b6e0a620fec789a836ab08533c16cbeeb&w=826",
    },
    ProfileType: {
      type: String,
      // default:'ImageUpload'
    },
    BannerType: {
      type: String,
      // default:'ImageUpload'
    },
    ProfileAddress: {
      type: String,
    },
    BannerAddress: {
      type: String,
    },

  },
  { timestamps: true }
);

// Alternative way: Using pre-save middleware
Vcard_URL_Schema.pre("save", function (next) {
  this.URL_Alies = this.URL_Alies.toLowerCase();
  this.URL_Alies = this.URL_Alies.trim();
  next();
});

let Vcard_URL_model = mongoose.model("Vcard_URL_Collection", Vcard_URL_Schema);

export default Vcard_URL_model;

import mongoose from "mongoose";

let GallerySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies: {
      type: String,
      required: true,
    },
    // GalleryImage: {
    //   filename: String,
    //   contentType: String,
    //   imageBase64: String,
      
    // },

    GalleryImage:{
      type:String,
      required:true,
    },
    GalleryType: {
      type: String,
    },
    GalleryImageURL: {
      type: String,
    },
  },
  { timestamps: true }
);

let GalleryModel = mongoose.model("GalleryData", GallerySchema);
export default GalleryModel;

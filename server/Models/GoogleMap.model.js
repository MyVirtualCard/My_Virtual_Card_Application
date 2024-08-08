
import mongoose from "mongoose";

let GoogleMapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies:{
      type:String,
      required:true,
    },
    GoogleIframe: {
      type: String,
    }
  },
  { timestamps: true }
);

let GoogleMapModel = mongoose.model("GoogleMapData", GoogleMapSchema);

export default GoogleMapModel;

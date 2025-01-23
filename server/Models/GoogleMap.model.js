
import mongoose from "mongoose";

let GoogleMapSchema = new mongoose.Schema(
  {
    UserName: {
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

let GoogleMapModel = mongoose.model("GoogleMap_Data", GoogleMapSchema);

export default GoogleMapModel;

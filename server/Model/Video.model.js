import mongoose from "mongoose";

let VideoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies: {
      type: String,
      required: true,
    },
    Video:{
      type:String,
      required:true
    },
  },
  { timestamps: true }
);

let VideoModel = mongoose.model("VideoData", VideoSchema);
export default VideoModel;

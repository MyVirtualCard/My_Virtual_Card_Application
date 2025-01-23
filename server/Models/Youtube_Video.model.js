import mongoose from "mongoose";

let YoutubeVideoSchema = new mongoose.Schema(
  {
    UserName: {
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

let Youtube_Video_Model = mongoose.model("Youtube_Video_Data", YoutubeVideoSchema);
export default Youtube_Video_Model;

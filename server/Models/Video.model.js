import mongoose from "mongoose";
// MongoDB Schema (optional)
const videoSchema = new mongoose.Schema({
  UserName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  URL_Alies: {
    type: String,
    required: true,
  },
  videos: [
    {
      path: String, // Path of the uploaded video
      filename: String, // Original name of the video
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
});

const Video_Model = mongoose.model("Video", videoSchema);

export default Video_Model;

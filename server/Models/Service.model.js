import mongoose from "mongoose";

let serviceSchema = new mongoose.Schema(
  {
    UserName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies: {
      type: String,
      required: true,
    },
    ServiceName: {
      type: String,
      required: true,
    },
    ServiceURL: {
      type: String,
    },
    ServicePrice: {
      type: Number,
    },
    ServiceDescription: {
      type: String,
      // required: true,
    },
    ServiceImage: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/communication-flat-icon_1262-18771.jpg?t=st=1719429342~exp=1719432942~hmac=e02df0cb22a183e064f86beec9403185007088ca24dfaa75b2b7a391d811df09&w=826",
    },
    ServiceType: {
      type: String,
      // default:'ImageUpload'
    },
    ServiceIcon: {
      type: String,
    },
    ServiceAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

let Service_Model = mongoose.model("ServiceData", serviceSchema);
export default Service_Model;

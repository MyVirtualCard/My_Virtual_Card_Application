import mongoose from "mongoose";

let serviceSchema = new mongoose.Schema(
  {
    user: {
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
    ServiceDescription: {
      type: String,
      // required: true,
    },
    // ServiceImage:{
    //   filename: String,
    //   contentType: String,
    //   imageBase64: String,
    // //   type: String,
    // //  default:'https://img.freepik.com/premium-photo/round-circle-with-mans-head-circle-with-circle-middle_807814-680.jpg?w=740'
    // },

    ServiceImage: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/communication-flat-icon_1262-18771.jpg?t=st=1719429342~exp=1719432942~hmac=e02df0cb22a183e064f86beec9403185007088ca24dfaa75b2b7a391d811df09&w=826",
    },
    ServiceType:{
      type:String,
      // default:'ImageUpload'
    },
    ServiceIcon:{
      type:String
    },
    ServiceAddress:{
      type:String
    }
  },
  { timestamps: true }
);

let ServiceModel = mongoose.model("ServiceData", serviceSchema);
export default ServiceModel;

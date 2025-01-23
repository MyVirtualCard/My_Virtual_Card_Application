import mongoose from "mongoose";

let UPISchema = new mongoose.Schema(
  {
    UserName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies: {
      type: String,
      required: true,
    },
    gpay: {
      type: String,
      required: false,
    },
    paytm: {
      type: String,
      required: false,
    },
    phonepay: {
      type: String,
    },
    UPI_Type: {
      type: String,
    },
    QRCodeImage: {
      type: String,
    },
  },
  { timestamps: true }
);

let UPIModel = mongoose.model("UPI_Datas", UPISchema);
export default UPIModel;

import mongoose from "mongoose";

let UPISchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies: {
      type: String,
      required: true,
    },
   gpay:{
    type: String,
    required: true,
   },
   paytm:{
    type:String,
    required: true,
   },
   phonepay:{
    type:String
   }
  },
  { timestamps: true }
);

let UPIModel = mongoose.model("UPI", UPISchema);
export default UPIModel;

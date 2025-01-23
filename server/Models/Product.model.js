import mongoose from "mongoose";

let ProductSchema = new mongoose.Schema(
  {
    UserName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    URL_Alies:{
      type:String,
      required:true,
    },
    ProductName: {
      type: String,
      // required: true,
    },
    ProductURL: {
      type: String,
    },
    ProductDescription: {
      type: String,
      // required: true,
    },
    ProductPrice: {
      type: Number,
      default: 0,
    },
    ProductImage:{
        type:String,
        default:
          "https://img.freepik.com/free-vector/communication-flat-icon_1262-18771.jpg?t=st=1719429342~exp=1719432942~hmac=e02df0cb22a183e064f86beec9403185007088ca24dfaa75b2b7a391d811df09&w=826",
    },
    ProductType:{
      type:String,
      // default:'ImageUpload'
    },
    ProductImageLink:{
      type:String
    }
  },
  { timestamps: true }
);

let ProductModel = mongoose.model("ProductData", ProductSchema);

export default ProductModel;

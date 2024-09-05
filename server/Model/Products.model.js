import mongoose from "mongoose";

let ProductSchema = new mongoose.Schema(
  {
    user: {
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
      filename: String,
      contentType: String,
      imageBase64: String,
    //   type: String,
    //  default:'https://img.freepik.com/premium-photo/round-circle-with-mans-head-circle-with-circle-middle_807814-680.jpg?w=740'
    },
    // ProductImage:{
    //     type:String,
    //     // required:true
    // },
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

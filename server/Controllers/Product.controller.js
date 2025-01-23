import ProductModel from "../Models/Product.model.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import axios from "axios";
import { fileURLToPath } from "url";
// Create __dirname manually in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname("server");
import { ProductUpload } from "../Multer/Product_Multer.js";
import UserModel from "../Models/User.model.js";
const uploadFields = ProductUpload.fields([
  { name: "ProductImage", maxCount: 1 }, // One profile image
]);
//Read or get all user product data  from database:
export const Get_ProductDataWithURL = async (req, res) => {
  try {
    let datas = await ProductModel.find({ URL_Alies: req.params.URL_Alies });
    if (!datas) {
      res.status(400).json({ message: "Data not found!" });
    } else {
      res.status(201).json({
        message: "Data Fetched!",
        length: datas.length,
        data: datas,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Post basic detail data to database:
export const Post_ProductDataWithURL = async (req, res) => {
  {
    uploadFields(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors like file size limit
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ message: "File too large. Maximum size allowed is 3MB." });
        }
        return res
          .status(500)
          .json({ message: `Multer error: ${err.message}` });
      } else if (err) {
        // Handle other errors
        return res.status(500).json({ message: `Error: ${err.message}` });
      }
      const ProductImage = req.files["ProductImage"]
        ? req.files["ProductImage"][0].path
        : null;
 
        let checkUserPlan = await UserModel.find({
          UserName: req.user.UserName,
        });
      
        if (checkUserPlan[0].Paid != true) {
          return res.status(400).json({ message: "Choose your plan first!" });
        };
      //Plan 2 and 3
      if (
  
        checkUserPlan[0]?.Plan === 'Free' ||
        checkUserPlan[0]?.Plan === 'Basic' ||
        checkUserPlan[0]?.Plan === 'EnterPrice'
      ) {
        //check images
        let checkProductLength = await ProductModel.find({
          URL_Alies: req.params.URL_Alies,
        });

        if (!checkProductLength) {
          return res
            .status(400)
            .json({ message: "Product will not be there!", error: err });
        } else {
          if (  checkUserPlan[0]?.Plan === 'EnterPrice') {
            const ProductImage = req.files["ProductImage"]
            ? req.files["ProductImage"][0]?.path
            : "";
            //Basic Image File limit checked:
            if (checkProductLength.length < 8) {
              // Create a new image instance and save to MongoDB
              const newProduct = new ProductModel({
                UserName: req.user.UserName,
                URL_Alies: req.body.URL_Alies,
                ProductName: req.body.ProductName,
                ProductDescription: req.body.ProductDescription,
                ProductType: req.body.ProductType,
                ProductImageLink: req.body.ProductImageLink,
                ProductURL: req.body.ProductURL,
                ProductPrice: req.body.ProductPrice,
                ProductImage: ProductImage,
              });

              await newProduct
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Product uploaded!",
                    data: newProduct,
                  });
                })
                .catch((err) => {
                  console.log(err.message);
                  res.status(400).json({
                    message: "Failed to save product to database!",
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max Product Upload limit crossed..Only accept 8 Product Details! ",
              });
            }
          }
     

          if ( checkUserPlan[0]?.Plan === 'Basic') {
            const ProductImage = req.files["ProductImage"]
            ? req.files["ProductImage"][0]?.path
            : "";
            //Basic Image File limit checked:
            if (checkProductLength.length < 5) {
              // Create a new image instance and save to MongoDB
              const newProduct = new ProductModel({
                UserName: req.user.UserName,
                URL_Alies: req.body.URL_Alies,
                ProductName: req.body.ProductName,
                ProductDescription: req.body.ProductDescription,
                ProductType: req.body.ProductType,
                ProductImageLink: req.body.ProductImageLink,
                ProductURL: req.body.ProductURL,
                ProductPrice: req.body.ProductPrice,
                ProductImage: ProductImage,
              });

              await newProduct
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Product uploaded!",
                    data: newProduct,
                  });
                })
                .catch((err) => {
                  console.log(err.message);
                  res.status(400).json({
                    message: "Failed to save product to database!",
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max Product Upload limit crossed..Only accept 5 Product Details! ",
              });
            }
          }
          if (   checkUserPlan[0]?.Plan === 'Free') {
            //Basic Image File limit checked:
            if (checkProductLength.length < 2) {
              // Create a new image instance and save to MongoDB
              const newProduct = new ProductModel({
                UserName: req.user.UserName,
                URL_Alies: req.body.URL_Alies,
                ProductName: req.body.ProductName,
                ProductDescription: req.body.ProductDescription,
                ProductType: req.body.ProductType,
                ProductImageLink: req.body.ProductImageLink,
                ProductURL: req.body.ProductURL,
                ProductPrice: req.body.ProductPrice,
                ProductImage: ProductImage,
              });

              await newProduct
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Product uploaded!",
                    data: newProduct,
                  });
                })
                .catch((err) => {
                  console.log(err.message);
                  res.status(400).json({
                    message: "Failed to save product to database!",
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max Product Upload limit crossed..Only accept 2 Product Details! ",
              });
            }
          }
        }
      } else {
        res.status(400).json({ message: "Plan not match!" });
      }
    });
  }
};


// //Read or get Specific User all Data  :
export const Get_SpecificUserDataWithID = async (req, res) => {
  try {
    let { id } = req.params;
    let getSpecificData = await ProductModel.findById(id);

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res.status(201).json({ message: "Data Fetched!", data: getSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Update Specific document user data:

export const Update_SpecificUserDataWithID = async (req, res) => {
  {
    uploadFields(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors like file size limit
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ message: "File too large. Maximum size allowed is 3MB." });
        }
        return res
          .status(500)
          .json({ message: `Multer error: ${err.message}` });
      } else if (err) {
        // Handle other errors
        return res.status(500).json({ message: `Error: ${err.message}` });
      }
      const ProductImage = req.files["ProductImage"]
        ? req.files["ProductImage"][0].path
        : null;

        let checkUserPlan = await UserModel.find({
          UserName: req.user.UserName,
        });
      
        if (checkUserPlan[0].Paid != true) {
          return res.status(400).json({ message: "Choose your plan first!" });
        };
      //Plan 2 and 3
      if (

        checkUserPlan[0]?.Plan === 'Free' ||
        checkUserPlan[0]?.Plan === 'Basic' ||
        checkUserPlan[0]?.Plan === 'EnterPrice'
      ) {
        try {
          let { id } = req.params;
          let ProductSpecificData = await ProductModel.findByIdAndUpdate(id);
         

          if (!ProductSpecificData) {
            res.status(400).json({ message: "Data Not Found!" });
          } else {
            const ProductImage = req.files["ProductImage"]
              ? req.files["ProductImage"][0].path
              : null;
              if (ProductSpecificData.ProductType === "ImageUpload") {
                if (req.files['ProductImage']) {
                  fs.unlink(ProductSpecificData.ProductImage, (err) => {
                    if (err) {
                      console.error("Failed to delete the old image:", err);
                    }
                  });
                  ProductSpecificData.ProductImage = ProductImage; // Set new image path
                }
              };
            ProductSpecificData.URL_Alies = req.body.URL_Alies;
            ProductSpecificData.ProductName = req.body.ProductName;
            ProductSpecificData.ProductURL = req.body.ProductURL;
            ProductSpecificData.ProductType = req.body.ProductType;
            ProductSpecificData.ProductImageLink = req.body.ProductImageLink;
            ProductSpecificData.ProductPrice = req.body.ProductPrice;
            ProductSpecificData.ProductDescription =
              req.body.ProductDescription;

            const updatedProductData = await ProductSpecificData.save();

            res
              .status(201)
              .json({ message: "Product Updated!", data: updatedProductData });
          }
        } catch (error) {
          res.status(400).json({
            error: error.message,
            message: error.message,
          });
        }
      } else {
        res.status(400).json({ message: "Plan not match!" });
      }
    });
  }
};
//DELETE WITH ID
export const Delete_SpecificUserDataWithID = async (req, res) => {
    try {
      let { id } = req.params;
  
      let checkSpecificData = await ProductModel.findById(id);
  
      if (!checkSpecificData) {
        res.status(400).json({ message: "Data Not Found!" });
      } else {
        if (checkSpecificData.ProductType === "ImageUpload") {
          fs.unlink(checkSpecificData.ProductImage, (err) => {
            if (err) {
              console.error("Failed to delete the old image:", err);
            }
          });
          let deleteSpecificData = await ProductModel.findByIdAndDelete(id);
          res
            .status(201)
            .json({ message: "Product Deleted!", data: deleteSpecificData });
        } else {
          let deleteSpecificData = await ProductModel.findByIdAndDelete(id);
          res
            .status(201)
            .json({ message: "Product Deleted!", data: deleteSpecificData });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };
//DELETE ALL WITH URL-ALIES
export const Delete_SpecificUserAllDataWithURL = async (req, res) => {
    try {
      let { URL_Alies } = req.params;
  
      let checkSpecificData = await ProductModel.find({URL_Alies:req.params.URL_Alies});
      if (!checkSpecificData) {
        res.status(400).json({ message: "Data Not Found!" });
      } else {
          {checkSpecificData.map((data,index)=>{
            if(data.ProductType === "ImageUpload"){
              const ProductImages = data.ProductImage;
          
              fs.unlink(ProductImages, (err) => {
                if (err) {
                  console.error("Failed to delete the old image:", err);
                }
              });
            }
          })};
  
        
          let deleteSpecificData = await ProductModel.deleteMany({URL_Alies:req.params.URL_Alies});
          res
            .status(201)
            .json({ message: " All Products Deleted!", data: deleteSpecificData });
  
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };
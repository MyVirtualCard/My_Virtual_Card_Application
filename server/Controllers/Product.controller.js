import ProductModel from "../Model/Products.model.js";
import Payment from "../Model/Payment.model.js";
import currentPlan from "../Model/Plan.model.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import axios from "axios";
import { fileURLToPath } from "url";
// Create __dirname manually in ES module
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname("server");
import { ProductUpload } from "../Multer/Product_Multer.js";
const uploadFields = ProductUpload.fields([
  { name: "ProductImage", maxCount: 1 }, // One profile image
]);
//Read or get all user product data  from database:
export const GetProductData = async (req, res) => {
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
export const PostProductData = async (req, res) => {
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
      // If no error, proceed with saving the product
      if (!ProductImage) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      let checkCurrentPlan = await Payment.find({
        user: req.user.userName,
      });
      let checkFreePlan = await currentPlan.find({
        user: req.user.userName,
      });
      if (!checkCurrentPlan || !checkFreePlan) {
        return res
          .status(400)
          .json({ message: "Plan not be there!", error: err });
      }
      //Plan 2 and 3
      if (
        checkFreePlan[0]?.PlanPrice === 0 ||
        checkCurrentPlan[0]?.amount === 599 ||
        checkCurrentPlan[0]?.amount === 899 ||
        checkCurrentPlan[0]?.amount === 1299
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
          if (checkCurrentPlan[0]?.amount === 1299) {
            //Basic Image File limit checked:
            if (checkProductLength.length < 10) {
              // Create a new image instance and save to MongoDB
              const newProduct = new ProductModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                ProductName: req.body.ProductName,
                ProductDescription: req.body.ProductDescription,

                ProductURL: req.body.ProductURL,
                ProductType: req.body.ProductType,
                ProductImageLink: req.body.ProductImageLink,
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
                .catch((error) => {
                  res.status(400).json({
                    message: "Failed to save Product to database!",
                    error: error.message,
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max Product Upload limit crossed..Only accept 10 Product Details! ",
              });
            }
          }
          if (checkCurrentPlan[0]?.amount === 899) {
            //Basic Image File limit checked:
            if (checkProductLength.length < 6) {
              // Create a new image instance and save to MongoDB
              const newProduct = new ProductModel({
                user: req.user.userName,
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
                  "Max Product Upload limit crossed..Only accept 6 Product Details! ",
              });
            }
          }

          if (checkCurrentPlan[0]?.amount === 599) {
            //Basic Image File limit checked:
            if (checkProductLength.length < 4) {
              // Create a new image instance and save to MongoDB
              const newProduct = new ProductModel({
                user: req.user.userName,
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
                  "Max Product Upload limit crossed..Only accept 4 Product Details! ",
              });
            }
          }
          if (checkFreePlan[0]?.PlanPrice === 0) {
            //Basic Image File limit checked:
            if (checkProductLength.length < 2) {
              // Create a new image instance and save to MongoDB
              const newProduct = new ProductModel({
                user: req.user.userName,
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

//   // //Read or get Specific User all Data  :
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await ProductModel.find({
      URL_Alies: req.params.URL_Alies,
    });

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res.status(201).json({
        message: " Data Fetched!",
        length: getSpecificData.length,
        data: getSpecificData,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// //Read or get Specific User all Data  :
export const getSpecificIdData = async (req, res) => {
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
//Update Specific document user data:

export const updateSpecificUserData = async (req, res) => {
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

      let checkCurrentPlan = await Payment.find({
        user: req.user.userName,
      });
      let checkFreePlan = await currentPlan.find({
        user: req.user.userName,
      });
      if (!checkCurrentPlan || !checkFreePlan) {
        return res.status(400).json({ message: "Plan not be there!" });
      }
      //Plan 2 and 3
      if (
        checkFreePlan[0]?.PlanPrice === 0 ||
        checkCurrentPlan[0]?.amount === 599 ||
        checkCurrentPlan[0]?.amount === 899 ||
        checkCurrentPlan[0]?.amount === 1299
      ) {
        try {
          let { id } = req.params;
          let ProductSpecificData = await ProductModel.findByIdAndUpdate(id);
          // let data = {
          //   ProductImage: {
          //     filename: req.file?.filename,
          //     contentType: req.file?.mimetype,
          //     imageBase64: req.file?.path,
          //   },
          //   URL_Alies: req.body.URL_Alies,
          //   ProductName: req.body.ProductName,
          //   ProductURL: req.body.ProductURL,
          //   ProductType: req.body.ProductType,
          //   ProductImageLink: req.body.ProductImageLink,
          //   ProductPrice: req.body.ProductPrice,
          //   ProductDescription: req.body.ProductDescription,
          // };

          if (!ProductSpecificData) {
            res.status(400).json({ message: "Data Not Found!" });
          } else {
            const ProductImage = req.files["ProductImage"]
              ? req.files["ProductImage"][0].path
              : null;
            if (req.files) {
              fs.unlink(ProductSpecificData.ProductImage, (err) => {
                if (err) {
                  console.error("Failed to delete the old image:", err);
                }
              });
              ProductSpecificData.ProductImage = ProductImage; // Set new image path
            }
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

//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await ProductModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res.status(201).json({
        message: "Product Deleted!",
        length: deleteSpecificData.length,
        data: deleteSpecificData,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { filename } = req.params;

    let deleteSpecificData = await ProductModel.findOneAndDelete(filename);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      const filePath = path.join(
        __dirname,
        "uploads",
        "Product_Image",
        filename
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Failed to delete the old image:", err);
        }
      });
      res
        .status(201)
        .json({ message: "Product Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

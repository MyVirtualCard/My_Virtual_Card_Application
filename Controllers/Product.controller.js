import ProductModel from "../Models/Products.model.js";
import currentPlan from "../Models/Plan.model.js";
import productUpload from "../Multer/product.js";
import fs from "fs";
import multer from "multer";

//Read or get all user product data  from database:
export const GetProductData = async (req, res) => {
  try {
    let datas = await ProductModel.find({  URL_Alies: req.params.URL_Alies});
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
}
//Post basic detail data to database:
export const PostProductData =  (req, res) => {
  productUpload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File size too large. Maximum limit is 2MB." });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      res.status(400).json({ message: err });
    } else {
      if (!req.body.ProductImage) {
        return res.status(400).json({ message: "No file choosen!" });
      }

      let checkCurrentPlan = await currentPlan.find({
        user: req.user.userName,
      });

      if (!checkCurrentPlan) {
        return res
          .status(400)
          .json({ message: "Plan not be there!", error: err });
      }
      if (checkCurrentPlan.length <= 0) {
        return res
          .status(400)
          .json({ message: "Choose your Plan first!", error: err });
      } else {
        //Plan 2 and 3
        if (
          checkCurrentPlan[0].PlanPrice === 10 ||
          checkCurrentPlan[0].PlanPrice === 365 ||
          checkCurrentPlan[0].PlanPrice === 799 ||
          checkCurrentPlan[0].PlanPrice === 1499
        ) {
          //check images
          let checkProductLength = await ProductModel.find({
            URL_Alies:req.params.URL_Alies
          });


          if (!checkProductLength) {
            return res
              .status(400)
              .json({ message: "Product will not be there!", error: err });
          } else {
            if (checkCurrentPlan[0].PlanPrice === 1499) {
              //Basic Image File limit checked:
              if (checkProductLength.length < 10) {
                // Create a new image instance and save to MongoDB
                const newProduct = new ProductModel({
                  user: req.user.userName,
                  URL_Alies:req.body.URL_Alies,
                  ProductName: req.body.ProductName,
                  ProductDescription: req.body.ProductDescription,
                  ProductImage:req.body.ProductImage,
                  ProductURL: req.body.ProductURL,
                  ProductPrice: req.body.ProductPrice,
                  // ProductImage: {
                  //   data: fs.readFileSync("uploads/" + req.file.filename),
                  //   contentType: req.file.mimetype,
                  // },
               
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
                      error:error.message
                    
                    });
                  });
              } else {
                res.status(400).json({
                  message:
                    "Max Product Upload limit crossed..Only accept 10 Product Details! ",
            
                });
              }
            }
            if (checkCurrentPlan[0].PlanPrice === 799
            ) {
              //Basic Image File limit checked:
              if (checkProductLength.length < 5) {
                // Create a new image instance and save to MongoDB
                const newProduct = new ProductModel({
                  user: req.user.userName,
                  URL_Alies:req.body.URL_Alies,
                  ProductName: req.body.ProductName,
                  ProductDescription: req.body.ProductDescription,

                  ProductURL: req.body.ProductURL,
                  ProductPrice: req.body.ProductPrice,
                  ProductImage:req.body.ProductImage
                  // ProductImage: {
                  //   data: fs.readFileSync("uploads/" + req.file.filename),
                  //   contentType: req.file.mimetype,
                  // },
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
                    console.log(err.message)
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
            if (checkCurrentPlan[0].PlanPrice === 10) {
              //Basic Image File limit checked:
              if (checkProductLength.length < 0) {
                res.status(400).json({
                  message: "Product Access denied for Demo Plan!",
                  data: newProduct,
                });
              } else {
                res.status(400).json({
                  message: "Product Access denied for Demo Plan!",
             
                });
              }
            }
            if (checkCurrentPlan[0].PlanPrice === 365) {
              //Basic Image File limit checked:
              if (checkProductLength.length < 0) {
                res.status(200).json({
                  message: "Product Access denied for Basic Plan!",
                  data: newProduct,
                });
              } else {
                res.status(400).json({
                  message: "Product Access denied for Basic Plan!",
                
                });
              }
            }
          }
        } else {
          res.status(400).json({ message: "Plan not match!", error: err });
        }
      }
    }
  });
};

;

//   // //Read or get Specific User all Data  :
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await ProductModel.find({    URL_Alies:req.params.URL_Alies });

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
  productUpload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({
            message: "Product Image File size too large. Maximum limit is 2MB.",
          });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      res.status(400).json({ message: err });
    } else {
      if (!req.body.ProductImage) {
        return res.status(400).json({ message: "No file choosen!" });
      }

      let checkCurrentPlan = await currentPlan.find({
        user: req.user.userName,
      });

      if (!checkCurrentPlan) {
        return res
          .status(400)
          .json({ message: "Plan not be there!"});
      }
      if (checkCurrentPlan.length <= 0) {
        return res
          .status(400)
          .json({ message: "Choose your Plan first!" });
      } else {
        //Plan 2 and 3
        if (
          checkCurrentPlan[0].PlanPrice === 10 ||
          checkCurrentPlan[0].PlanPrice === 365 ||
          checkCurrentPlan[0].PlanPrice === 799 ||
          checkCurrentPlan[0].PlanPrice === 1499
        ) {
          try {
            let { id } = req.params;
            let data = {
              ProductImage:req.body.ProductImage,
              URL_Alies:req.body.URL_Alies,
              ProductName:req.body.ProductName,
              ProductURL:req.body.ProductURL,
              ProductPrice:req.body.ProductPrice,
              ProductDescription:req.body.ProductDescription
            };
            let updateSpecificData = await ProductModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        
            if (!updateSpecificData) {
              res.status(400).json({ message: "Data Not Found!" });
            } else {
              res
                .status(201)
                .json({ message: "Data Updated!", data: updateSpecificData });
            }
          } catch (error) {
            res.status(400).json({ error: error.message, message:'Image File size too large. Maximum limit is 2MB.' });
          }
        } else {
          res.status(400).json({ message: "Plan not match!"});
        }
      }
    }
  });
 
};
// export const updateSpecificUserData = async (req, res) => {
//   try {
//     let { id } = req.params;
//     let data = req.body;
//     let updateSpecificData = await ProductModel.findByIdAndUpdate(id, data);

//     if (!updateSpecificData) {
//       res.status(400).json({ message: "Data Not Found!" });
//     } else {
//       res
//         .status(201)
//         .json({ message: "Data Updated!", data: updateSpecificData });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await ProductModel.deleteMany({
      URL_Alies:req.params.URL_Alies
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res.status(201).json({
        message: "Data Deleted!",
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
    let { id } = req.params;

    let deleteSpecificData = await ProductModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


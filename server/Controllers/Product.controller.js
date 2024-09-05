import ProductModel from "../Model/Products.model.js";
import Payment from "../Model/Payment.model.js";
import currentPlan from "../Model/Plan.model.js";


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
  let checkCurrentPlan = await Payment.find({
    user: req.user.userName,
  });
  let checkFreePlan = await currentPlan.find({
    URL_Alies: req.params.URL_Alies,
  });
  if (!checkCurrentPlan ||  !checkFreePlan) {
    return res.status(400).json({ message: "Plan not be there!", error: err });
  };
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
                ProductImage: {
                  filename: req.file?.filename,
                  contentType: req.file?.mimetype,
                  imageBase64: req.file?.path,
                },
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
                ProductImage: {
                  filename: req.file?.filename,
                  contentType: req.file?.mimetype,
                  imageBase64: req.file?.path,
                },
             
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
                ProductImage: {
                  filename: req.file?.filename,
                  contentType: req.file?.mimetype,
                  imageBase64: req.file?.path,
                },
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
                ProductImage: {
                  filename: req.file?.filename,
                  contentType: req.file?.mimetype,
                  imageBase64: req.file?.path,
                },
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
        res.status(400).json({ message: "Plan not match!", });
      }
  // if (checkCurrentPlan.length <= 0) {
  //   return res
  //     .status(400)
  //     .json({ message: "Choose your Plan first!", error: err });
  // } else {

  // }
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
  let checkCurrentPlan = await Payment.find({
    user: req.user.userName,
  });
  let checkFreePlan = await currentPlan.find({
    user: req.user.userName,
  });
  if (!checkCurrentPlan || !checkFreePlan) {
    return res.status(400).json({ message: "Plan not be there!" });
  };
      //Plan 2 and 3
      if (
        checkFreePlan[0]?.PlanPrice === 0 ||
      checkCurrentPlan[0]?.amount === 599 ||
      checkCurrentPlan[0]?.amount === 899 ||
      checkCurrentPlan[0]?.amount === 1299
      ) {
        try {
          let { id } = req.params;
          let data = {
            ProductImage: {
              filename: req.file?.filename,
              contentType: req.file?.mimetype,
              imageBase64: req.file?.path,
            },
            URL_Alies: req.body.URL_Alies,
            ProductName: req.body.ProductName,
            ProductURL: req.body.ProductURL,
            ProductType: req.body.ProductType,
            ProductImageLink: req.body.ProductImageLink,
            ProductPrice: req.body.ProductPrice,
            ProductDescription: req.body.ProductDescription,
          };
          let updateSpecificData = await ProductModel.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
          );
  
          if (!updateSpecificData) {
            res.status(400).json({ message: "Data Not Found!" });
          } else {
            res
              .status(201)
              .json({ message: "Product Updated!", data: updateSpecificData });
          }
        } catch (error) {
          res
            .status(400)
            .json({
              error: error.message,
              message: error.message,
            });
        }
      } else {
        res.status(400).json({ message: "Plan not match!" });
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
    let { id } = req.params;

    let deleteSpecificData = await ProductModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Product Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

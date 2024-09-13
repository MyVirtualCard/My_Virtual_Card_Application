import GalleryModel from "../Model/Gallery.model.js";
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
import { GalleryUpload } from "../Multer/Gallery_Multer.js";
const uploadFields = GalleryUpload.fields([
  { name: "GalleryImage", maxCount: 1 }, // One profile image
]);
//Read or get all user basicDetail data  from database:

export const GetGalleryData = async (req, res) => {
  try {
    let datas = await GalleryModel.find({ URL_Alies: req.params.URL_Alies });
    if (!datas) {
      res.status(400).json({ message: "Data not found" });
    } else {
      res.status(201).json({
        message: "Data Fetched!",
        data: datas,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const PostGalleryData = async (req, res) => {
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
      const GalleryImage = req.files["GalleryImage"]
        ? req.files["GalleryImage"][0].path
        : null;
      // If no error, proceed with saving the product
  
      // if (!GalleryImage ) {
      //   return res.status(400).json({ message: "No file uploaded" });
      // };

      let checkCurrentPlan = await Payment.find({
        user: req.user.userName,
      });
      let checkFreePlan = await currentPlan.find({
        user: req.user.userName,
      });
    
      if (!checkCurrentPlan || !checkFreePlan) {
        return res.status(400).json({ message: "Choose Your Plan First!" });
      }
      //Plan 2 and 3
      if (
        checkFreePlan[0]?.PlanPrice === 0 ||
        checkCurrentPlan[0]?.amount === 599 ||
        checkCurrentPlan[0]?.amount === 899 ||
        checkCurrentPlan[0]?.amount === 1299
      ) {
        //check images
        let checkCurrentImages = await GalleryModel.find({
          URL_Alies: req.params.URL_Alies,
        });
    
        if (!checkCurrentImages) {
          return res
            .status(400)
            .json({ message: "Image will not be there!", error: err });
        } else {
          if (checkCurrentPlan[0]?.amount === 1299) {
            //Basic Image File limit checked:
            if (checkCurrentImages.length < 10) {
              // Create a new image instance and save to MongoDB
              const newImage = new GalleryModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                GalleryImageURL: req.body.GalleryImageURL,
                GalleryType: req.body.GalleryType,
                GalleryImage:GalleryImage,
              });
    
              newImage
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Image uploaded!",
                    data: newImage,
                  });
                })
                .catch((err) => {
                  res.status(400).json({
                    message: "Failed to save image to database!",
                  });
                });
            } else {
              res.status(400).json({
                message: "Max Image Upload limit crossed!..Only accept 10 Images ",
              });
            }
          }
          if (checkCurrentPlan[0]?.amount === 899) {
            //Basic Image File limit checked:
            if (checkCurrentImages.length < 6) {
              // Create a new image instance and save to MongoDB
              const newImage = new GalleryModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                GalleryImageURL: req.body.GalleryImageURL,
                GalleryType: req.body.GalleryType,
                GalleryImage:GalleryImage,
              });
    
              newImage
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Image uploaded!",
                    data: newImage,
                  });
                })
                .catch((err) => {
                  res.status(400).json({
                    message: "Failed to save image to database!",
                  });
                });
            } else {
              res.status(400).json({
                message: "Max Image Upload limit crossed!..Only accept 6 Images ",
              });
            }
          }
          if (checkCurrentPlan[0]?.amount === 599) {
            const GalleryImage = req.files["GalleryImage"]
            ? req.files["GalleryImage"][0]?.path
            : "";
            //Basic Image File limit checked:
            if (checkCurrentImages.length < 4) {
              // Create a new image instance and save to MongoDB
              const newImage = new GalleryModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                GalleryImageURL: req.body.GalleryImageURL,
                GalleryType: req.body.GalleryType,
                GalleryImage:GalleryImage,
              });
    
              newImage
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Image uploaded!",
                    data: newImage,
                  });
                })
                .catch((err) => {
                  res.status(400).json({
                    message: "Failed to save image to database!",
                  });
                });
            } else {
              res.status(400).json({
                message: "Max Image Upload limit crossed!..Only accept 4 Images ",
              });
            }
          }
          if (checkFreePlan[0]?.PlanPrice === 0) {
            //Basic Image File limit checked:
            if (checkCurrentImages.length < 2) {
              // Create a new image instance and save to MongoDB
              const newImage = new GalleryModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                GalleryImageURL: req.body.GalleryImageURL,
                GalleryType: req.body.GalleryType,
                GalleryImage:GalleryImage,
              });
    
              newImage
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Image uploaded!",
                    data: newImage,
                  });
                })
                .catch((err) => {
                  res.status(400).json({
                    message: "Failed to save image to database!",
                  });
                });
            } else {
              res.status(400).json({
                message: "Trial Plan Only accept 2 Images ",
              });
            }
          }
        }
      } else {
        res.status(400).json({ message: "Plan not match!", error: err });
      }

    });

  }


};

// //Read or get Specific User all Data  :
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await GalleryModel.find({
      URL_Alies: req.params.URL_Alies,
    });

    if (!getSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
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
    let getSpecificData = await GalleryModel.findById(id);

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res.status(201).json({ message: " Data Fetched", data: getSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
      const GalleryImage = req.files["GalleryImage"]
        ? req.files["GalleryImage"][0].path
        : null;
      // If no error, proceed with saving the product
      // if (!GalleryImage) {
      //   return res.status(400).json({ message: "No file uploaded" });
      // };

      let checkCurrentPlan = await Payment.find({
        user: req.user.userName,
      });
      let checkFreePlan = await currentPlan.find({
        user: req.user.userName,
      });
      if (!checkCurrentPlan || !checkFreePlan) {
        return res.status(400).json({ message: "Plan not be there!" });
      }
    
      if (
        checkFreePlan[0]?.PlanPrice === 0 ||
        checkCurrentPlan[0]?.amount === 599 ||
        checkCurrentPlan[0]?.amount === 899 ||
        checkCurrentPlan[0]?.amount === 1299
      ) {
        try {
          let { id } = req.params;
          let GallerySpecificData = await GalleryModel.findByIdAndUpdate(id);
       

          if (!GallerySpecificData) {
            res.status(400).json({ message: "Data Not Found!" });
          } else {
            const GalleryImage = req.files["GalleryImage"]
              ? req.files["GalleryImage"][0].path
              : null;
              if (GallerySpecificData.GalleryType === "ImageUpload") {
                if (req.files) {
                  fs.unlink(GallerySpecificData.GalleryImage, (err) => {
                    if (err) {
                      console.error("Failed to delete the old image:", err);
                    }
                  });
                  GallerySpecificData.GalleryImage = GalleryImage; // Set new image path
                }
              };
            GallerySpecificData.URL_Alies = req.body.URL_Alies;
            GallerySpecificData.GalleryImageURL = req.body.GalleryImageURL;
            GallerySpecificData.GalleryType = req.body.GalleryType;

            const updatedGalleryData = await GallerySpecificData.save();

            res
              .status(201)
              .json({ message: "Gallery Updated!", data: updatedGalleryData });
          }
        } catch (error) {
          res.status(400).json({ error: error.message });
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
    let deleteSpecificData = await GalleryModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({
          message: "All Gallery Images Deleted!",
          data: deleteSpecificData,
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// DELETE method to delete a file
export const deleteSpecificFileData=async (req, res) => {
  const filename = req.params;
  const filePath = path.join(__dirname, 'uploads', 'Gallery_Image', filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found!' });
    }

    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting file!' });
      }
      res.json({ message: 'File deleted successfully!' });
    });
  });
}
//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let checkSpecificData=await GalleryModel.findById(id);

    if (!checkSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      if(checkSpecificData.GalleryType === 'ImageUpload'){
        fs.unlink(checkSpecificData.GalleryImage, (err) => {
          if (err) {
            console.error("Failed to delete the old image:", err);
          }
        });
        let deleteSpecificData = await GalleryModel.findByIdAndDelete(id);
        res
        .status(201)
        .json({ message: "Image Deleted!", data: deleteSpecificData });

      }else{
        let deleteSpecificData = await GalleryModel.findByIdAndDelete(id);
        res
        .status(201)
        .json({ message: "Image Deleted!", data: deleteSpecificData });
      }
  
   


    
    }




  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const deleteSpecificUserIdData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await GalleryModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Image Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
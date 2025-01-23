
import Service_Model from "../Models/Service.model.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";
import sharp from "sharp";
// Create __dirname manually in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname("server");
import { ServiceUpload } from "../Multer/Service_Multer.js";
import UserModel from "../Models/User.model.js";
//Read or get all user basicDetail data  from database:
// Handle multiple file fields
const uploadFields = ServiceUpload.fields([
  { name: "ServiceImage", maxCount: 1 }, // One profile image
]);
export const Get_ServiceDataWithURL= async (req, res) => {
  try {
    let datas = await Service_Model.find({ URL_Alies: req.params.URL_Alies });
    if (!datas) {
      res.status(400).json({
        message: "Data not found!",
        length: datas.length,
        data: datas,
      });
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
export const Create_ServiceData = async (req, res) => {
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
      let checkUserPlan = await UserModel.find({
        UserName: req.user.UserName,
      });
    
      if (checkUserPlan[0].Paid != true) {
        return res.status(400).json({ message: "Choose your Plan first!" });
      };
      //Plan 2 and 3
      if (
        checkUserPlan[0]?.Plan === 'Free' ||
        checkUserPlan[0]?.Plan === 'Basic' ||
        checkUserPlan[0]?.Plan === 'EnterPrice'
      ) {
        //check images
        let checkServiceLength = await Service_Model.find({
          URL_Alies: req.params.URL_Alies,
        });

        if (!checkServiceLength) {
          return res.status(400).json({ message: "Service  not be there!" });
        } else {
          if ( checkUserPlan[0]?.Plan === 'EnterPrice') {
            if (checkServiceLength.length < 8) {
              const ServiceImage = req.files["ServiceImage"]
                ? req.files["ServiceImage"][0]?.path
                : "";
              // Define the folder and the output path for the compressed image
              const uploadsFolder = path.join(
                __dirname,
                "uploads",
                "Service_Image"
              );


              // Ensure that the uploads folder exists
              if (!fs.existsSync(uploadsFolder)) {
                fs.mkdirSync(uploadsFolder, { recursive: true });
              }

        
      
        

              // Create a new image instance and save to MongoDB
              const newService = new Service_Model({
                UserName: req.user.UserName,
                URL_Alies: req.body.URL_Alies,
                ServiceName: req.body.ServiceName,
                ServiceDescription: req.body.ServiceDescription,
                ServiceType: req.body.ServiceType,
                ServiceURL: req.body.ServiceURL,
                ServicePrice:req.body.ServicePrice,
                ServiceIcon: req.body.ServiceIcon,
                ServiceAddress: req.body.ServiceAddress,
                // ServiceImage: req.body.ServiceImage,
                ServiceImage: ServiceImage,
              });

              await newService
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Service uploaded!",
                    data: newService,
                  });
                })
                .catch((err) => {
                  console.log(err.message);
                  res.status(400).json({
                    message: "Failed to save Service to database!",
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max Service limit crossed..Basic plan Only accept 8  Service Details! ",
              });
            }
          }
       

          if (   checkUserPlan[0]?.Plan === 'Basic') {
            if (checkServiceLength.length < 6) {
              const ServiceImage = req.files["ServiceImage"]
                ? req.files["ServiceImage"][0]?.path
                : "";
              // Define the folder and the output path for the compressed image
              const uploadsFolder = path.join(
                __dirname,
                "uploads",
                "Service_Image"
              );

              // Ensure that the uploads folder exists
              if (!fs.existsSync(uploadsFolder)) {
                fs.mkdirSync(uploadsFolder, { recursive: true });
              }
              // Create a new image instance and save to MongoDB
              const newService = new Service_Model({
                UserName: req.user.UserName,
                URL_Alies: req.body.URL_Alies,
                ServiceName: req.body.ServiceName,
                ServiceDescription: req.body.ServiceDescription,
                ServiceType: req.body.ServiceType,
                ServiceURL: req.body.ServiceURL,
                ServicePrice:req.body.ServicePrice,
                ServiceIcon: req.body.ServiceIcon,
                ServiceAddress: req.body.ServiceAddress,
                // ServiceImage: req.body.ServiceImage,
                ServiceImage: ServiceImage,
              });

              await newService
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Service uploaded!",
                    data: newService,
                  });
                })
                .catch((err) => {
                  console.log(err.message);
                  res.status(400).json({
                    message: "Failed to save Service to database!",
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max Service limit crossed..Basic plan Only accept 6  Service Details! ",
              });
            }
          }
          if ( checkUserPlan[0]?.Plan === 'Free') {
            //Basic Image File limit checked:
            if (checkServiceLength.length < 2) {
              const ServiceImage = req.files["ServiceImage"]
                ? req.files["ServiceImage"][0].path
                : null;
              // Create a new image instance and save to MongoDB
              const newService = new Service_Model({
                UserName: req.user.UserName,
                URL_Alies: req.body.URL_Alies,
                ServiceName: req.body.ServiceName,
                ServiceDescription: req.body.ServiceDescription,
                ServiceType: req.body.ServiceType,
                ServiceURL: req.body.ServiceURL,
                ServicePrice:req.body.ServicePrice,
                ServiceIcon: req.body.ServiceIcon,
                ServiceAddress: req.body.ServiceAddress,
                // ServiceImage: req.body.ServiceImage,

                ServiceImage: ServiceImage,
              });

              await newService
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Service uploaded!",
                    data: newService,
                  });
                })
                .catch((err) => {
                  console.log(err.message);
                  res.status(400).json({
                    message: "Failed to save Service to database!",
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max Service limit crossed..Standard plan Only accept 2  Service Details! ",
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
    let getSpecificData = await Service_Model.findById(id);

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

      let checkUserPlan = await UserModel.find({
        UserName: req.user.UserName,
      });
    
      if (checkUserPlan[0].Paid != true) {
        return res.status(400).json({ message: "Choose your Plan first!" });
      };
      //Plan 2 and 3
      if (
       
        checkUserPlan[0]?.Plan === 'Free' ||
        checkUserPlan[0]?.Plan === 'Basic' ||
        checkUserPlan[0]?.Plan === 'EnterPrice'
      ) {
        try {
          let { id } = req.params;
          let ServiceSpecificData = await Service_Model.findByIdAndUpdate(id);
          if (!ServiceSpecificData) {
            res.status(400).json({ message: "Data Not Found!" });
          } else {
            const ServiceImage = req.files["ServiceImage"]
              ? req.files["ServiceImage"][0]?.path
              : "";

            if (ServiceSpecificData.ServiceType === "ImageUpload") {
              if (req.files["ServiceImage"]) {
                fs.unlink(ServiceSpecificData.ServiceImage, (err) => {
                  if (err) {
                    console.error("Failed to delete the old image:", err);
                  }
                });
                ServiceSpecificData.ServiceImage = ServiceImage; // Set new image path
              }
            }

            ServiceSpecificData.URL_Alies = req.body.URL_Alies;
            ServiceSpecificData.ServiceName = req.body.ServiceName;
            ServiceSpecificData.ServiceURL = req.body.ServiceURL;
            ServiceSpecificData.ServicePrice=req.body.ServicePrice,
            ServiceSpecificData.ServiceType = req.body.ServiceType;
            ServiceSpecificData.ServiceIcon = req.body.ServiceIcon;
            ServiceSpecificData.ServiceAddress = req.body.ServiceAddress;
            ServiceSpecificData.ServiceDescription =
              req.body.ServiceDescription;

            const updatedServiceData = await ServiceSpecificData.save();

            res
              .status(201)
              .json({ message: "Service Updated!", data: updatedServiceData });
          }
        } catch (error) {
          console.log(error.message);
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



//Delete Spcific user  Document in Basic Detail:

export const Delete_SpecificUserDataWithID = async (req, res) => {
  try {
    let { id } = req.params;

    let checkSpecificData = await Service_Model.findById(id);

    if (!checkSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      if (checkSpecificData.ServiceType === "ImageUpload") {
        fs.unlink(checkSpecificData.ServiceImage, (err) => {
          if (err) {
            console.error("Failed to delete the old image:", err);
          }
        });
        let deleteSpecificData = await Service_Model.findByIdAndDelete(id);
        res
          .status(201)
          .json({ message: "Service Deleted!", data: deleteSpecificData });
      } else {
        let deleteSpecificData = await Service_Model.findByIdAndDelete(id);
        res
          .status(201)
          .json({ message: "Service Deleted!", data: deleteSpecificData });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//Delete Specific User Bssic detail All data deleted By using user Id:
export const Delete_SpecificUserAllDataWithURL = async (req, res) => {
  try {
    let { URL_Alies } = req.params;

    let checkSpecificData = await Service_Model.find({URL_Alies:req.params.URL_Alies});

    if (!checkSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
        {checkSpecificData.map((data,index)=>{
          if(data.ServiceType === "ImageUpload"){
            const ServiceImages = data.ServiceImage;
        
            fs.unlink(ServiceImages, (err) => {
              if (err) {
                console.error("Failed to delete the old image:", err);
              }
            });
          }
        })};

      
        let deleteSpecificData = await Service_Model.deleteMany({URL_Alies:req.params.URL_Alies});
        res
          .status(201)
          .json({ message: " All Service Deleted!", data: deleteSpecificData });

    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

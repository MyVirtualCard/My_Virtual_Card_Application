import ServiceModel from "../Model/Services.model.js";
import multer from "multer";
import currentPlan from "../Model/Plan.model.js";
import fs from "fs";
import path from "path";
import axios from "axios";
import Payment from "../Model/Payment.model.js";
import { fileURLToPath } from "url";

// Create __dirname manually in ES module
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname("server");

import { ServiceUpload } from "../Multer/Service_Multer.js";
//Read or get all user basicDetail data  from database:
// Handle multiple file fields
const uploadFields = ServiceUpload.fields([
  { name: "ServiceImage", maxCount: 1 }, // One profile image
]);

export const GetServiceData = async (req, res) => {
  try {
    let datas = await ServiceModel.find({ URL_Alies: req.params.URL_Alies });
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
export const PostServiceData = async (req, res) => {
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
      const ServiceImage = req.files["ServiceImage"]
        ? req.files["ServiceImage"][0].path
        : null;
      // If no error, proceed with saving the product
      // if (!ServiceImage || !req.body.ServiceAddress) {
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
      //Plan 2 and 3
      if (
        checkFreePlan[0]?.PlanPrice === 0 ||
        checkCurrentPlan[0]?.amount === 599 ||
        checkCurrentPlan[0]?.amount === 899 ||
        checkCurrentPlan[0]?.amount === 1299
      ) {
        //check images
        let checkServiceLength = await ServiceModel.find({
          URL_Alies: req.params.URL_Alies,
        });

        if (!checkServiceLength || !checkFreePlan) {
          return res.status(400).json({ message: "Service  not be there!" });
        } else {
          if (checkCurrentPlan[0]?.amount === 1299) {
            //Basic Image File limit checked:
            if (checkServiceLength.length < 8) {
              const ServiceImage = req.files["ServiceImage"]
                ? req.files["ServiceImage"][0].path
                : null;
              // Create a new image instance and save to MongoDB
              const newService = new ServiceModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                ServiceName: req.body.ServiceName,
                ServiceDescription: req.body.ServiceDescription,
                ServiceURL: req.body.ServiceURL,
                ServiceType: req.body.ServiceType,
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
                  "Max Service limit crossed..Enterprice plan Only accept 8  Service Details! ",
              });
            }
          }
          if (checkCurrentPlan[0]?.amount === 899) {
            //Basic Image File limit checked:
            if (checkServiceLength.length < 6) {
              const ServiceImage = req.files["ServiceImage"]
                ? req.files["ServiceImage"][0].path
                : null;
              // Create a new image instance and save to MongoDB
              const newService = new ServiceModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                ServiceName: req.body.ServiceName,
                ServiceDescription: req.body.ServiceDescription,
                ServiceType: req.body.ServiceType,
                ServiceURL: req.body.ServiceURL,
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
                  "Max Service limit crossed..Standard plan Only accept 6  Service Details! ",
              });
            }
          }

          if (checkCurrentPlan[0]?.amount === 599) {
            if (checkServiceLength.length < 4) {
              const ServiceImage = req.files["ServiceImage"]
                ? req.files["ServiceImage"][0]?.path
                : "";
              // Create a new image instance and save to MongoDB
              const newService = new ServiceModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                ServiceName: req.body.ServiceName,
                ServiceDescription: req.body.ServiceDescription,
                ServiceType: req.body.ServiceType,
                ServiceURL: req.body.ServiceURL,
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
                  "Max Service limit crossed..Basic plan Only accept 4  Service Details! ",
              });
            }
          }
          if (checkFreePlan[0]?.PlanPrice === 0) {
            if (checkServiceLength.length < 2) {
              const ServiceImage = req.files["ServiceImage"]
                ? req.files["ServiceImage"][0].path
                : null;
              // Create a new image instance and save to MongoDB
              const newService = new ServiceModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                ServiceName: req.body.ServiceName,
                ServiceDescription: req.body.ServiceDescription,
                ServiceType: req.body.ServiceType,
                ServiceURL: req.body.ServiceURL,
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
                  "Max Service limit crossed..Basic plan Only accept 2  Service Details! ",
              });
            }
          }
          // if (checkCurrentPlan[0].amount === 10) {
          //   //Basic Image File limit checked:
          //   if (checkServiceLength.length < 0) {
          //     res.status(400).json({
          //       message: "Service Access denied for Demo Plan!",
          //       data: newService,
          //     });
          //   } else {
          //     res.status(400).json({
          //       message: "Service Access denied for Demo Plan!",
          //     });
          //   }
          // }
        }
      } else {
        res.status(400).json({ message: "Plan not match!" });
      }
    });
  }
};

//   // //Read or get Specific User all Data  :
export const getSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await ServiceModel.find({
      URL_Alies: req.params.URL_Alies,
    });

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res.status(201).json({
        message: "Data Fetched!",
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
    let getSpecificData = await ServiceModel.findById(id);

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
          let ServiceSpecificData = await ServiceModel.findByIdAndUpdate(id);
          // let data = {
          //   ServiceImage: {
          //     filename: req.file?.filename,
          //     contentType: req.file?.mimetype,
          //     imageBase64: req.file?.path,
          //   },
          //   URL_Alies: req.body.URL_Alies,
          //   ServiceName: req.body.ServiceName,
          //   ServiceURL: req.body.ServiceURL,
          //   ServiceType: req.body.ServiceType,
          //   ServiceIcon:req.body.ServiceIcon,
          //   ServiceAddress:req.body.ServiceAddress,
          //   ServiceDescription: req.body.ServiceDescription,
          // };

          if (!ServiceSpecificData) {
            res.status(400).json({ message: "Data Not Found!" });
          } else {
            const ServiceImage = req.files["ServiceImage"]
              ? req.files["ServiceImage"][0]?.path
              : '';
          
            if (ServiceSpecificData.ServiceType === "ImageUpload") {
              if (req.files) {
                fs.unlink(ServiceSpecificData.ServiceImage, (err) => {
                  if (err) {
                    console.error("Failed to delete the old image:", err);
                  }
                });
                ServiceSpecificData.ServiceImage = ServiceImage; // Set new image path
              }
            };

            ServiceSpecificData.URL_Alies = req.body.URL_Alies;
            ServiceSpecificData.ServiceName = req.body.ServiceName;
            ServiceSpecificData.ServiceURL = req.body.ServiceURL;
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

//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await ServiceModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res.status(201).json({
        message: "All Services Deleted!",
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

    let deleteSpecificData = await ServiceModel.findOneAndDelete(filename);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      const filePath = path.join(
        __dirname,
        "uploads",
        "Service_Image",
        filename
      );

      if(deleteSpecificData.ServiceType === 'ImageUpload'){
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Failed to delete the old image:", err);
          }
        });
      }


      res
        .status(201)
        .json({ message: "Service Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserIdData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await ServiceModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Service Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};


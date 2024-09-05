import ServiceModel from "../Model/Services.model.js";

import currentPlan from "../Model/Plan.model.js";

import Payment from "../Model/Payment.model.js";
//Read or get all user basicDetail data  from database:

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
  let checkCurrentPlan = await Payment.find({
    user: req.user.userName,
  });
  let checkFreePlan = await currentPlan.find({
    URL_Alies: req.params.URL_Alies,
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
        //check images
        let checkServiceLength = await ServiceModel.find({
          URL_Alies: req.params.URL_Alies,
        });
  
        if (!checkServiceLength || !checkFreePlan) {
          return res
            .status(400)
            .json({ message: "Service  not be there!" });
        } else {
          if (checkCurrentPlan[0]?.amount === 1299) {
            //Basic Image File limit checked:
            if (checkServiceLength.length < 8) {
              // Create a new image instance and save to MongoDB
              const newService = new ServiceModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                ServiceName: req.body.ServiceName,
                ServiceDescription: req.body.ServiceDescription,
                ServiceURL: req.body.ServiceURL,
                ServiceType: req.body.ServiceType,
                ServiceIcon:req.body.ServiceIcon,
                ServiceAddress:req.body.ServiceAddress,
                // ServiceImage: req.body.ServiceImage,
                ServiceImage: {
                  filename: req.file?.filename,
                  contentType: req.file?.mimetype,
                  imageBase64: req.file?.path,
                },
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
              // Create a new image instance and save to MongoDB
              const newService = new ServiceModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                ServiceName: req.body.ServiceName,
                ServiceDescription: req.body.ServiceDescription,
                ServiceType: req.body.ServiceType,
                ServiceURL: req.body.ServiceURL,
                ServiceIcon:req.body.ServiceIcon,
                ServiceAddress:req.body.ServiceAddress,
                // ServiceImage: req.body.ServiceImage,

                 ServiceImage: {
                  filename: req.file?.filename,
                  contentType: req.file?.mimetype,
                  imageBase64: req.file?.path,
                },
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
              // Create a new image instance and save to MongoDB
              const newService = new ServiceModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                ServiceName: req.body.ServiceName,
                ServiceDescription: req.body.ServiceDescription,
                ServiceType: req.body.ServiceType,
                ServiceURL: req.body.ServiceURL,
                ServiceIcon:req.body.ServiceIcon,
                ServiceAddress:req.body.ServiceAddress,
                // ServiceImage: req.body.ServiceImage,
                ServiceImage: {
                  filename: req.file?.filename,
                  contentType: req.file?.mimetype,
                  imageBase64: req.file?.path,
                },
               
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
              // Create a new image instance and save to MongoDB
              const newService = new ServiceModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                ServiceName: req.body.ServiceName,
                ServiceDescription: req.body.ServiceDescription,
                ServiceType: req.body.ServiceType,
                ServiceURL: req.body.ServiceURL,
                ServiceIcon:req.body.ServiceIcon,
                ServiceAddress:req.body.ServiceAddress,
                // ServiceImage: req.body.ServiceImage,
                ServiceImage: {
                  filename: req.file?.filename,
                  contentType: req.file?.mimetype,
                  imageBase64: req.file?.path,
                },
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
  // if (checkCurrentPlan.length <= 0) {
  //   return res
  //     .status(400)
  //     .json({ message: "Choose your Plan first!" });
  // } else {

  // }
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
          ServiceImage: {
            filename: req.file?.filename,
            contentType: req.file?.mimetype,
            imageBase64: req.file?.path,
          },
          URL_Alies: req.body.URL_Alies,
          ServiceName: req.body.ServiceName,
          ServiceURL: req.body.ServiceURL,
          ServiceType: req.body.ServiceType,
          ServiceIcon:req.body.ServiceIcon,
          ServiceAddress:req.body.ServiceAddress,
          ServiceDescription: req.body.ServiceDescription,
        };
        let updateSpecificData = await ServiceModel.findByIdAndUpdate(
          id,
          data,
          { new: true, runValidators: true }
        );

        if (!updateSpecificData) {
          res.status(400).json({ message: "Data Not Found!" });
        } else {
          res
            .status(201)
            .json({ message: "Service Updated!", data: updateSpecificData });
        }
      } catch (error) {
        console.log(error.message)
        res.status(400).json({
       
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
    res.status(400).json({ error: error.message });
  }
};

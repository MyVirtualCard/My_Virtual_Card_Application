
import GoogleMapModel from "../Model/GoogleMap.model.js";
import Payment from "../Model/Payment.model.js";
import currentPlan from "../Model/Plan.model.js";
//Read or get all user product data  from database:
export const GetGoogleMapData = async (req, res) => {
  try {
    let datas = await GoogleMapModel.find({ URL_Alies: req.params.URL_Alies });
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
export const PostGoogleMapData = async (req, res) => {
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
        checkCurrentPlan[0]?.amount === 1499
      ) {
        //check images
        let checkMapLength = await GoogleMapModel.find({
          URL_Alies: req.params.URL_Alies,
        });
  
        if (!checkMapLength) {
          return res
            .status(400)
            .json({ message: "GoogleMap  not be there!" });
        } else {
          if (checkCurrentPlan[0]?.amount === 1499 || checkCurrentPlan[0]?.amount === 899 || checkCurrentPlan[0]?.amount === 599) {
            //Basic Image File limit checked:
            if (checkMapLength.length < 1) {
              // Create a new image instance and save to MongoDB
              const newGoogleIframe = new GoogleMapModel({
                user: req.user.userName,
                URL_Alies: req.body.URL_Alies,
                GoogleIframe: req.body.GoogleIframe,
              
              });
  
              await newGoogleIframe
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "GoogleMap IFrame uploaded!",
                    data: newGoogleIframe,
                  });
                })
                .catch((error) => {
                  res.status(400).json({
                    message: "Failed to save GoogleMap to database!",
                    error: error.message,
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max GoogleMap Upload limit crossed..Only accept 1 GoogleMap Details! ",
              });
            }
          }
  
          if (checkFreePlan[0]?.PlanPrice === 0) {
            //Basic Image File limit checked:
            if (checkMapLength.length < 0) {
              res.status(400).json({
                message: "GoogleMap  Access denied for Trial Plan!",
                data: newGoogleIframe,
              });
            } else {
              res.status(400).json({
                message: "GoogleMap Access denied for Trial Plan!",
              });
            }
          }
        }
      } else {
        res.status(400).json({ message: "Plan not match!", error: err });
      }

  // if (checkCurrentPlan?.length <= 0 || checkFreePlan?.length<=0) {
  //   return res
  //     .status(400)
  //     .json({ message: "Choose your Plan first!" });
  // } else {

  // }
};

//   // //Read or get Specific User all Data  :
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await GoogleMapModel.find({
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
    let getSpecificData = await GoogleMapModel.findById(id);

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

  if (!checkCurrentPlan) {
    return res.status(400).json({ message: "Plan not be there!" });
  }
  if (checkCurrentPlan.length <= 0) {
    return res.status(400).json({ message: "Choose your Plan first!" });
  } else {
    //Plan 2 and 3
    if (
      checkCurrentPlan[0].amount === 10 ||
      checkCurrentPlan[0].amount === 599 ||
      checkCurrentPlan[0].amount === 899 ||
      checkCurrentPlan[0].amount === 1499
    ) {
      try {
        let { id } = req.params;
        let data = {
          URL_Alies: req.body.URL_Alies,
          GoogleIframe: req.body.GoogleIframe,
        };
        let updateSpecificData = await GoogleMapModel.findByIdAndUpdate(
          id,
          data,
          { new: true, runValidators: true }
        );

        if (!updateSpecificData) {
          res.status(400).json({ message: "Data Not Found!" });
        } else {
          res
            .status(201)
            .json({ message: "Google Map URL Updated!", data: updateSpecificData });
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
  }
};

//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await GoogleMapModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res.status(201).json({
        message: "Google Map URL Deleted!",
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

    let deleteSpecificData = await GoogleMapModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Google Map URL Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

import PopupBannerModel from "../Model/PopupBanner.model.js";
import Payment from "../Model/Payment.model.js";
import currentPlan from "../Model/Plan.model.js";

export const PostPopupBannerData = async (req, res) => {
  if (
    !req.body.BannerTitle ||
    !req.body.BannerDescription ||
    !req.body.BannerButtonName
  ) {
    return res.status(401).json({ message: "All * fields are Mandatory!" });
  }

  let checkCurrentPlan = await Payment.find({
    user: req.user.userName,
  });
  let checkFreePlan = await currentPlan.find({
    URL_Alies: req.params.URL_Alies,
  });
  if (!checkCurrentPlan || !checkFreePlan) {
    return res
      .status(400)
      .json({ message: "Choose your Plan first!" });
  };
      //Plan 2 and 3
      if (
        checkFreePlan[0]?.PlanPrice === 0 ||
        checkCurrentPlan[0]?.amount === 599 ||
        checkCurrentPlan[0]?.amount === 899 ||
        checkCurrentPlan[0]?.amount === 1499
      ) {
        //check images
        let checkCurrentBanner = await PopupBannerModel.find({
          URL_Alies: req.params.URL_Alies,
        });
  
        if (!checkCurrentBanner) {
          return res
            .status(400)
            .json({ message: "Banner Data  not be Inserted!" });
        } else {
          if (checkCurrentPlan[0]?.amount === 1499) {
            //Basic Image File limit checked:
            if (checkCurrentBanner.length < 1) {
              // Create a new image instance and save to MongoDB
              const newBanner = new PopupBannerModel({
                user: req.user.userName,
                URL_Alies: req.params.URL_Alies,
                BannerTitle: req.body.BannerTitle,
                BannerURL: req.body.BannerURL,
                BannerActive: req.body.BannerActive,
                BannerDescription: req.body.BannerDescription,
                BannerButtonName: req.body.BannerButtonName,
              });
  
              newBanner
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Banner Data  uploaded!",
                    data: newBanner,
                  });
                })
                .catch((err) => {
                  res.status(400).json({
                    message: "Failed to save Banner Data to database!",
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max Banner Data Upload limit crossed!..Only accept 1 Data ",
              });
            }
          }
          if (
            checkCurrentPlan[0]?.amount === 599 ||
            checkCurrentPlan[0]?.amount === 899
          ) {
            //Basic Image File limit checked:
            if (checkCurrentBanner.length < 1) {
              // Create a new image instance and save to MongoDB
              const newBanner = new PopupBannerModel({
                user: req.user.userName,
                URL_Alies: req.params.URL_Alies,
                BannerTitle: req.body.BannerTitle,
                BannerURL: req.body.BannerURL,
                BannerActive: req.body.BannerActive,
                BannerDescription: req.body.BannerDescription,
                BannerButtonName: req.body.BannerButtonName,
              });
  
              newBanner
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Banner Data uploaded!",
                    data: newBanner,
                  });
                })
                .catch((err) => {
                  res.status(400).json({
                    message: "Failed to save Banner Data to database!",
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max Banner Data Upload limit crossed!..Only accept 1 Data ",
              });
            }
          }
          if (checkFreePlan[0]?.PlanPrice === 0) {
            //Basic Image File limit checked:
            if (checkCurrentBanner.length < 0) {
              res.status(400).json({
                message: "Banner Data Access denied for Trial Plan!",
              });
            } else {
              res.status(400).json({
                message: "Banner Data Access denied for Trial Plan!",
              });
            }
          }
        }
      } else {
        res.status(400).json({ message: "Plan not match!", error: err });
      }

};

// //Read or get Specific User all Data  :
export const readSpecificUserData = async (req, res) => {
  try {
    let getSpecificData = await PopupBannerModel.find({
      URL_Alies: req.params.URL_Alies,
    });

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else if (getSpecificData.length <= 0) {
      res.status(400).json({ message: "Data not been inserted!..Empty Data" });
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
    let getSpecificData = await PopupBannerModel.findById(id);

    if (!getSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: " Data Fetched!", data: getSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Update Specific document user data:

export const updateSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await PopupBannerModel.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data,
      { new: true }
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Banner Data Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await PopupBannerModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Banner Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await PopupBannerModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Banner Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

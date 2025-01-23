import Payment from "../../Models/Payment.model.js";

import Dynmaic_Logo_Banner_Model from "../../Models/Dynamic_Vcard_Models/Second_Banner_Logo.model.js";
//Post basic detail data to database:
export const CreateImageThemeData = async (req, res) => {
  try {
    let checkCurrentPlan = await Payment.find({
      UserName: req.user.UserName,
    });
    if (!checkCurrentPlan) {
      return res.status(400).json({ message: "Plan not be there!" });
    }
    //Plan 2 and 3
    if (
   
      checkCurrentPlan[0]?.amount === 599 ||
      checkCurrentPlan[0]?.amount === 899 ||
      checkCurrentPlan[0]?.amount === 1499
    ) {
      //check images
      let checkPopupBannerLength = await Dynmaic_Logo_Banner_Model.find({
        URL_Alies: req.params.URL_Alies,
      });

      if (!checkPopupBannerLength) {
        return res
          .status(400)
          .json({ message: "Images Theme details not be there!" });
      } else {
        //Basic Image File limit checked:
        if (checkPopupBannerLength.length < 1) {
          // Create a new image instance and save to MongoDB
          const NewVcardThemeData = new Dynmaic_Logo_Banner_Model({
            UserName: req.user.UserName,
            URL_Alies: req.params.URL_Alies,
            BannerHeight: req.body.BannerHeight,
            BannerBrightness: req.body.BannerBrightness,
            LogoWidth: req.body.LogoWidth,
            LogoWidthUnit: req.body.LogoWidthUnit,
            LogoHeight: req.body.LogoHeight,
            LogoHeightUnit: req.body.LogoHeightUnit,
            LogoBorderRadius: req.body.LogoBorderRadius,
            LogoBorderRadiusUnit: req.body.LogoBorderRadiusUnit,
            LogoPosition: req.body.LogoPosition,
            LogoTopPosition: req.body.LogoTopPosition,
            LogoLeftPosition: req.body.LogoLeftPosition,
            LogoImageAnimation:req.body.LogoImageAnimation,
            LogoPositionUnit: req.body.LogoPositionUnit,
          });

          await NewVcardThemeData.save()
            .then(() => {
              res.status(200).json({
                message: "Images Theme saved!",
                data: NewVcardThemeData,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                message: "Failed to save Images Theme Details!",
              });
            });
        } else {
          res.status(400).json({
            message: "Already Images Theme detail saved ! ",
          });
        }
      }
    } else {
      res.status(400).json({ message: "Plan not match!", error: err });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// //Read or get Specific User all Data  :
export const readUserImageThemeData = async (req, res) => {
  try {
    let getSpecificData = await Dynmaic_Logo_Banner_Model.find({
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
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
//Update Specific document user data:

export const updateUserImageThemeData = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await Dynmaic_Logo_Banner_Model.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data,
      { new: true }
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Images Theme Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteUserImageThemeData = async (req, res) => {
  try {
    let deleteSpecificData = await Dynmaic_Logo_Banner_Model.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Images Theme Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

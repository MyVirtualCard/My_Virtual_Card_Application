import Payment from "../../Models/Payment.model.js";
import ServiceThemeModel from "../../Models/Dynamic_Vcard_Models/Fifth_Service_Theme.model.js";
//Post basic detail data to database:
export const CreateServiceThemeData = async (req, res) => {
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
      let checkPopupBannerLength = await ServiceThemeModel.find({
        URL_Alies: req.params.URL_Alies,
      });

      if (!checkPopupBannerLength) {
        return res
          .status(400)
          .json({ message: "Service Theme details not be there!" });
      } else {
        //Basic Image File limit checked:
        if (checkPopupBannerLength.length < 1) {
          // Create a new image instance and save to MongoDB
          const NewVcardThemeData = new ServiceThemeModel({
            UserName: req.user.UserName,
            URL_Alies: req.params.URL_Alies,
            ServiceBackColor: req.body.ServiceBackColor,
            ServiceTextColor: req.body.ServiceTextColor,
            ServiceTitleColor: req.body.ServiceTitleColor,
            ServiceTitleFont: req.body.ServiceTitleFont,
            ServiceTitleSize: req.body.ServiceTitleSize,
            ServiceTitleUnit: req.body.ServiceTitleUnit,
            ServiceFontWeight: req.body.ServiceFontWeight,
            ServiceTitleAlign: req.body.ServiceTitleAlign,
            BtnBackColor: req.body.BtnBackColor,
            BtnTextColor: req.body.BtnTextColor,
            BtnHoverBackColor: req.body.BtnHoverBackColor,
            BtnHoverTextColor:req.body.BtnHoverTextColor,

          
          });

          await NewVcardThemeData.save()
            .then(() => {
              res.status(200).json({
                message: "Service Theme saved!",
                data: NewVcardThemeData,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                message: "Failed to save Service Theme Details!",
              });
            });
        } else {
          res.status(400).json({
            message: "Already Service Theme detail saved ! ",
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
export const readUserServiceThemeData = async (req, res) => {
  try {
    let getSpecificData = await ServiceThemeModel.find({
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

export const updateUserServiceThemeData = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await ServiceThemeModel.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data,
      { new: true }
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Service Theme Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteUserServiceThemeData = async (req, res) => {
  try {
    let deleteSpecificData = await ServiceThemeModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Service Theme Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

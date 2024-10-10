import Payment from "../../Model/Payment.model.js";
import currentPlan from "../../Model/Plan.model.js";
import AppoinmentThemeModel from "../../Model/Dynamic_Vcard_Models/Nine_Appoinment.model.js";
//Post basic detail data to database:
export const CreateAppoinmentThemeData = async (req, res) => {
  try {
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
      let checkPopupBannerLength = await AppoinmentThemeModel.find({
        URL_Alies: req.params.URL_Alies,
      });

      if (!checkPopupBannerLength) {
        return res
          .status(400)
          .json({ message: "Appoinment Theme details not be there!" });
      } else {
        //Basic Image File limit checked:
        if (checkPopupBannerLength.length < 1) {
          // Create a new image instance and save to MongoDB
          const NewVcardThemeData = new AppoinmentThemeModel({
            user: req.user.userName,
            URL_Alies: req.params.URL_Alies,
            AppoinmentInputDesign: req.body.AppoinmentInputDesign,
            LabelColor: req.body.LabelColor,
            InputBorderColor:req.body.InputBorderColor,
            InputBorderOnFocus: req.body.InputBorderOnFocus,
            PlaceholderColor: req.body.PlaceholderColor,
            InputError: req.body.InputError,
            InputColor: req.body.InputColor,         
          });

          await NewVcardThemeData.save()
            .then(() => {
              res.status(200).json({
                message: "Appoinment Theme saved!",
                data: NewVcardThemeData,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                message: "Failed to save Appoinment Theme Details!",
              });
            });
        } else {
          res.status(400).json({
            message: "Already Testimonial Theme detail saved ! ",
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
export const readUserAppoinmentThemeData = async (req, res) => {
  try {
    let getSpecificData = await AppoinmentThemeModel.find({
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

export const updateUserAppoinmentThemeData = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await AppoinmentThemeModel.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data,
      { new: true }
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Appoinment Theme Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteUserAppoinmentThemeData = async (req, res) => {
  try {
    let deleteSpecificData = await AppoinmentThemeModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Appoinment Theme Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

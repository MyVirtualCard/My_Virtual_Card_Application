import Payment from "../../Models/Payment.model.js";

import Dynamic_Button_Icon_Model from "../../Models/Dynamic_Vcard_Models/Third_Button_Design.model.js";
//Post basic detail data to database:
export const CreateButtonThemeData = async (req, res) => {
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
      let checkPopupBannerLength = await Dynamic_Button_Icon_Model.find({
        URL_Alies: req.params.URL_Alies,
      });

      if (!checkPopupBannerLength) {
        return res
          .status(400)
          .json({ message: "Button Theme details not be there!" });
      } else {
        //Basic Image File limit checked:
        if (checkPopupBannerLength.length < 1) {
          // Create a new image instance and save to MongoDB
          const NewVcardThemeData = new Dynamic_Button_Icon_Model({
            UserName: req.user.UserName,
            URL_Alies: req.params.URL_Alies,
            BtnBackColour: req.body.BtnBackColour,
            BtnTextColour: req.body.BtnTextColour,
            BtnHoverColour: req.body.BtnHoverColour,
            BtnHoverTextColour: req.body.BtnHoverTextColour,
            ContactBtnBorderRadius: req.body.ContactBtnBorderRadius,
            ContactBtnUnit: req.body.ContactBtnUnit,
            IconBorderRadius: req.body.IconBorderRadius,
            IconUnit: req.body.IconUnit,
            UserDataPosition:req.body.UserDataPosition,
          
          });

          await NewVcardThemeData.save()
            .then(() => {
              res.status(200).json({
                message: "Button Theme saved!",
                data: NewVcardThemeData,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                message: "Failed to save Button Theme Details!",
              });
            });
        } else {
          res.status(400).json({
            message: "Already Button Theme detail saved ! ",
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
export const readUserButtonThemeData = async (req, res) => {
  try {
    let getSpecificData = await Dynamic_Button_Icon_Model.find({
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

export const updateUserButtonThemeData = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await Dynamic_Button_Icon_Model.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data,
      { new: true }
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Button Theme Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteUserButtonThemeData = async (req, res) => {
  try {
    let deleteSpecificData = await Dynamic_Button_Icon_Model.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Button Theme Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

import Payment from "../../Models/Payment.model.js";
import Dynamic_Title_Model from "../../Models/Dynamic_Vcard_Models/Fourth_Title_Design.model.js";
//Post basic detail data to database:
export const CreateTitleThemeData = async (req, res) => {
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
      let checkPopupBannerLength = await Dynamic_Title_Model.find({
        URL_Alies: req.params.URL_Alies,
      });

      if (!checkPopupBannerLength) {
        return res
          .status(400)
          .json({ message: "Title Theme details not be there!" });
      } else {
        //Basic Image File limit checked:
        if (checkPopupBannerLength.length < 1) {
          // Create a new image instance and save to MongoDB
          const NewVcardThemeData = new Dynamic_Title_Model({
            UserName: req.user.UserName,
            URL_Alies: req.params.URL_Alies,
            TitleColor: req.body.TitleColor,
            TitleSize: req.body.TitleSize,
            TitleUnit: req.body.TitleUnit,
            TitleFontWeight: req.body.TitleFontWeight,
            TitleFont: req.body.TitleFont,
            TitlePosition: req.body.TitlePosition,

            SubTitleColor: req.body.SubTitleColor,
            SubTitleSize: req.body.SubTitleSize,
            SubTitleUnit: req.body.SubTitleUnit,
            SubTitleFontWeight: req.body.SubTitleFontWeight,
            SubTitleFont: req.body.SubTitleFont,
            SubTitlePosition: req.body.SubTitlePosition,
      
          });

          await NewVcardThemeData.save()
            .then(() => {
              res.status(200).json({
                message: "Title Theme saved!",
                data: NewVcardThemeData,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                message: "Failed to save Title Theme Details!",
              });
            });
        } else {
          res.status(400).json({
            message: "Already Title Theme detail saved ! ",
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
export const readUserTitleThemeData = async (req, res) => {
  try {
    let getSpecificData = await Dynamic_Title_Model.find({
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

export const updateUserTitleThemeData = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await Dynamic_Title_Model.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data,
      { new: true }
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Title Theme Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteUserTitleThemeData = async (req, res) => {
  try {
    let deleteSpecificData = await Dynamic_Title_Model.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Title Theme Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

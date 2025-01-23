import Payment from "../../Models/Payment.model.js";
import VcardThemeModel from "../../Models/Dynamic_Vcard_Models/First_Vcard_Theme.model.js";
//Post basic detail data to database:
export const CreateVcardThemeData = async (req, res) => {
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
      let checkPopupBannerLength = await VcardThemeModel.find({
        URL_Alies: req.params.URL_Alies,
      });

      if (!checkPopupBannerLength) {
        return res
          .status(400)
          .json({ message: "Vcard Theme details not be there!" });
      } else {
        //Basic Image File limit checked:
        if (checkPopupBannerLength.length < 1) {
          // Create a new image instance and save to MongoDB
          const NewVcardThemeData = new VcardThemeModel({
            UserName: req.user.UserName,
            URL_Alies: req.params.URL_Alies,
            VCardColour: req.body.VCardColour,
            WebsiteBackgroundType: req.body.WebsiteBackgroundType,
            WebsiteBackImageAddress: req.body.WebsiteBackImageAddress,
            LinearGradient: req.body.LinearGradient,
            DesktopViewBackColor: req.body.DesktopViewBackColor,
            DesktopViewBackColor2: req.body.DesktopViewBackColor2,
            VCardTextColour: req.body.VCardTextColour,
            SVG_Design: req.body.SVG_Design,
          });

          await NewVcardThemeData.save()
            .then(() => {
              res.status(200).json({
                message: "Vcard Theme saved!",
                data: NewVcardThemeData,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                message: "Failed to save Vcard Theme Details!",
              });
            });
        } else {
          res.status(400).json({
            message: "Already Vcard Theme detail saved ! ",
          });
        }
      }
    } else {
      res.status(400).json({ message: "Plan not match!" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// //Read or get Specific User all Data  :
export const readUserVcardThemeData = async (req, res) => {
  try {
    let getSpecificData = await VcardThemeModel.find({
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

export const updateUserVcardThemeData = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await VcardThemeModel.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data,
      { new: true }
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Vcard Theme Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteUserVcardThemeData = async (req, res) => {
  try {
    let deleteSpecificData = await VcardThemeModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Vcard Theme Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

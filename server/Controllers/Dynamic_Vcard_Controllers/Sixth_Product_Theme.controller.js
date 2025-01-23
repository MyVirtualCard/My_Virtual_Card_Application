import Payment from "../../Models/Payment.model.js";
import ProductThemeModel from "../../Models/Dynamic_Vcard_Models/Sixth_Product_Theme.model.js";
//Post basic detail data to database:
export const CreateProductThemeData = async (req, res) => {
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
      let checkPopupBannerLength = await ProductThemeModel.find({
        URL_Alies: req.params.URL_Alies,
      });

      if (!checkPopupBannerLength) {
        return res
          .status(400)
          .json({ message: "Product Theme details not be there!" });
      } else {
        //Basic Image File limit checked:
        if (checkPopupBannerLength.length < 1) {
          // Create a new image instance and save to MongoDB
          const NewVcardThemeData = new ProductThemeModel({
            UserName: req.user.UserName,
            URL_Alies: req.params.URL_Alies,
            ProductBackColor: req.body.ProductBackColor,
            ProductTextColor: req.body.ProductTextColor,
            ProductTitleColor: req.body.ProductTitleColor,
            ProductTitleFont: req.body.ProductTitleFont,
            ProductTitleSize: req.body.ProductTitleSize,
            ProductTitleUnit: req.body.ProductTitleUnit,
            ProductFontWeight: req.body.ProductFontWeight,
            ProductTitleAlign: req.body.ProductTitleAlign,
            ProductBtnBackColor: req.body.ProductBtnBackColor,
            ProductBtnTextColor: req.body.ProductBtnTextColor,
            ProductBtnHoverBackColor: req.body.ProductBtnHoverBackColor,
            ProductBtnHoverTextColor:req.body.ProductBtnHoverTextColor,

          
          });

          await NewVcardThemeData.save()
            .then(() => {
              res.status(200).json({
                message: "Product Theme saved!",
                data: NewVcardThemeData,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                message: "Failed to save Product Theme Details!",
              });
            });
        } else {
          res.status(400).json({
            message: "Already Product Theme detail saved ! ",
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
export const readUserProductThemeData = async (req, res) => {
  try {
    let getSpecificData = await ProductThemeModel.find({
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

export const updateUserProductThemeData = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await ProductThemeModel.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data,
      { new: true }
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Product Theme Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteUserProductThemeData = async (req, res) => {
  try {
    let deleteSpecificData = await ProductThemeModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Product Theme Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

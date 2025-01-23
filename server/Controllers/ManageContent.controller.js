
import ManageContentModel from "../Models/ManageContent.model.js";
import PaymentModel from "../Models/Payment.model.js";
import UserModel from "../Models/User.model.js";
//Post basic detail data to database:
export const PostManageContentData = async (req, res) => {
  try {

    let checkUserPlan = await UserModel.find({
      UserName: req.user.UserName,
    });
  
    if (checkUserPlan[0].Paid != true) {
      return res.status(400).json({ message: "Choose your plan first!" });
    };
          //Plan 2 and 3
          if (
     
            checkUserPlan[0]?.Plan === 'Free' ||
        checkUserPlan[0]?.Plan === 'Basic' ||
        checkUserPlan[0]?.Plan === 'EnterPrice'
          ) {
            //check images
            let checkPopupBannerLength = await ManageContentModel.find({
              URL_Alies: req.params.URL_Alies,
            });
    
            if (!checkPopupBannerLength) {
              return res.status(400).json({ message: "ManageContent details not be there!" });
            } else {
              //Basic Image File limit checked:
              if (checkPopupBannerLength.length < 1) {
                // Create a new image instance and save to MongoDB
                const newManageContent = new ManageContentModel({
                    UserName: req.user.UserName,
                  URL_Alies: req.params.URL_Alies,
                  BannerActive: req.body.BannerActive,
                  BussinessHour: req.body.BussinessHour,
                  GoogleMap:req.body.GoogleMap,
                  Appoinment: req.body.Appoinment,
                  Service: req.body.Service,
                  Product: req.body.Product,
                  Gallery: req.body.Gallery,
                  Testimonial: req.body.Testimonial,
                  BankDetail: req.body.BankDetail,
                  FeedbackForm: req.body.FeedbackForm,
                  InquiryForm: req.body.InquiryForm,
                  ContactDetails: req.body.ContactDetails,
                  SocialMedia:req.body.SocialMedia
                });
    
                await newManageContent.save()
                  .then(() => {
                    res.status(200).json({
                      message: "Manage Content saved!",
                      data: newManageContent,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(400).json({
                      message: "Failed to save Manage Content Details!",
                    });
                  });
              } else {
                res.status(400).json({
                  message: "Already Manage Content detail saved ! ",
                });
              }
            }
          } else {
            res.status(400).json({ message: "Plan not match!", error: err });
          }
    // if (checkCurrentPlan.length <= 0) {
    //   return res.status(400).json({ message: "Choose your Plan first!" });
    // } else {

    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// //Read or get Specific User all Data  :
export const readSpecificUserData = async (req, res) => {
  try {
    let getSpecificData = await ManageContentModel.find({
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
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};
// //Read or get Specific User all Data  :
export const getSpecificIdData = async (req, res) => {
  try {
    let { id } = req.params;
    let getSpecificData = await ManageContentModel.findById(id);

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
    let updateSpecificData = await ManageContentModel.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data,
      { new: true }
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Manage Content Updated!", data: updateSpecificData });
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await ManageContentModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Manage Content Delted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await ManageContentModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Manage Content Deelted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

import PrivacyPolicyModel from "../Models/PrivacyPolicy.model.js";
import currentPlan from "../Models/Plan.model.js";
//Post basic detail data to database:

export const PostPrivacyPolicyData = async (req, res) => {
  try {
    if (!req.body.PrivacyPolicy) {
      return res.status(401).json({ message: "Mandatory:Privacy Policy" });
    }
    let checkCurrentPlan = await currentPlan.find({
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
        checkCurrentPlan[0].PlanPrice === 10 ||
        checkCurrentPlan[0].PlanPrice === 365 ||
        checkCurrentPlan[0].PlanPrice === 799 ||
        checkCurrentPlan[0].PlanPrice === 1499
      ) {
        //check images
        let checkPrivacyPolicyLength = await PrivacyPolicyModel.find({
          URL_Alies: req.params.URL_Alies,
        });

        if (!checkPrivacyPolicyLength) {
          return res.status(400).json({ message: "Privacy Policy  not be there!" });
        } else {
          //Basic Image File limit checked:
          if (checkPrivacyPolicyLength.length < 1) {
            // Create a new image instance and save to MongoDB
            const newPolicy= new PrivacyPolicyModel({
              user: req.user.userName,
              URL_Alies: req.params.URL_Alies,
              PrivacyPolicy: req.body.PrivacyPolicy
            });

            await newPolicy
              .save()
              .then(() => {
                res.status(200).json({
                  message: "Privacy Policy saved!",
                  data: newPolicy,
                });
              })
              .catch((err) => {
         
                res.status(400).json({
                  message: "Failed to save Privacy Policy!",
                });
              });
          } else {
            res.status(400).json({
              message: "Already Privacy Policy saved ! ",
            });
          }
        }
      } else {
        res.status(400).json({ message: "Plan not match!", error: err });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Read or get all user basicDetail data  from database:

export const GetPrivacyPolicyData = async (req, res) => {
  try {
    let datas = await PrivacyPolicyModel.find({  URL_Alies: req.params.URL_Alies});
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

//Read or get Specific User all Data  :
export const getSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await PrivacyPolicyModel.find({
      user: req.user.userName,
    });

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({
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
    let getSpecificData = await PrivacyPolicyModel.findById(id);

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
  try {
    let { id } = req.params;
    let data = {
      PrivacyPolicy:req.body.PrivacyPolicy,
      URL_Alies:req.params.URL_Alies
    }
    let updateSpecificData = await PrivacyPolicyModel.findOneAndUpdate( { URL_Alies: req.params.URL_Alies }, data);

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Data Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await PrivacyPolicyModel.findByIdAndDelete({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await PrivacyPolicyModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


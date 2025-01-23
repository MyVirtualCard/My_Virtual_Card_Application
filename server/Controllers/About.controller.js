

import AboutDetail_Model from "../Models/About.model.js";
import Vcard_URL_model from "../Models/Vcard_URL.model.js";
import PaymentModel from "../Models/Payment.model.js";
import UserModel from "../Models/User.model.js";
//DiskStorage:

//Get Async allback function..All user basicdata fetching :
export const Get_AboutAllData = async (req, res) => {
  try {
    let checkBasicDetail = await Vcard_URL_model.findOne({
      URL_Alies: req.params.URL_Alies,
    });
    if (!checkBasicDetail) {
      return res.status(400).json({ message: "About Data Not Found!" });
    } else {
      let getDatas = await AboutDetail_Model.find();
      return res.status(201).json({
        message: "Data Fetched sucessfully!",
        length: getDatas.length,
        data: getDatas,
      });
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
//Post Async allback function :
export const Post_AboutData = async (req, res) => {
  if (
    !req.body.URL_Alies ||
    !req.body.CompanyName ||
    !req.body.Category ||
    !req.body.Year ||
    !req.body.Specialities 
  ) {
    return res.status(401).json({ message: "All * fields Required" });
  }
  let checkUserPlan = await UserModel.find({
    UserName: req.user.UserName,
  });

  if (checkUserPlan[0].Paid != true) {
    return res.status(400).json({ message: "Plan not be there!" });
  };
      //All plan
      if (
        checkUserPlan[0]?.Plan === 'Free' ||
        checkUserPlan[0]?.Plan === 'Basic' ||
        checkUserPlan[0]?.Plan === 'EnterPrice'
      ) {
        let checkBasicDetailLength = await Vcard_URL_model.findOne({
          URL_Alies: req.params.URL_Alies
        });
  
        if (!checkBasicDetailLength) {
          return res
            .status(400)
            .json({ message: "This VCard URL doesn't exist!" });
        } else {
          let checkBasicData = await AboutDetail_Model.findOne({
            URL_Alies: req.params.URL_Alies,
          });
  
          if (checkBasicData) {
            return res.status(400).json({ message: "Basic Data Already Saved!" });
          } else {
            let data = {
              UserName: req.user.UserName,
              URL_Alies: req.params.URL_Alies,
              CompanyName:req.body.CompanyName,
              Category:req.body.Category ,
              Year:req.body.Year ,
              Bussiness:req.body.Bussiness ,
              Specialities: req.body.Specialities
            };
            let createDatas = new AboutDetail_Model(data);
            try {
              await createDatas.save();
              return res.status(201).json({
                message: "About Detail's saved!",
                length: createDatas.length,
                data: createDatas,
              });
            } catch (error) {
              return res.status(401).json({ message: error.message });
            }
          }
        }
      } else {
        res.status(400).json({ message: "Plan not match!", error: err });
      }

  // if (checkCurrentPlan.length <= 0) {
  //   return res.status(400).json({ message: "Choose your Plan first!" });
  // } else {

  // }
};
//Read or get Specific User basic Data  :
export const Get_SpecificUserDataWithURL = async (req, res) => {
  try {
    let getSpecificData = await AboutDetail_Model.find({
      URL_Alies: req.params.URL_Alies,
    });

    res.status(201).json({
      message: "Data Fetched!",
      length: getSpecificData.length,
      data: getSpecificData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update Specific document user data:
export const Update_SpecificUserDataWithURL = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;

    let updateSpecificData = await AboutDetail_Model.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "About Detail's Updated!", data: updateSpecificData });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

//Delete Specific User Bssic detail All data deleted By using user Id:
export const Delete_SpecificUserDataWithURL = async (req, res) => {
  try {
    let deleteSpecificData = await AboutDetail_Model.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });
    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "About Detail's Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


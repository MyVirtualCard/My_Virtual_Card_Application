
import BankModel from "../Models/BankDetail.model.js";
import Vcard_URL_model from "../Models/Vcard_URL.model.js";
import PaymentModel from "../Models/Payment.model.js";
import UserModel from "../Models/User.model.js";
//DiskStorage:

//Get Async allback function..All user basicdata fetching :
export const Get_BankDetails = async (req, res) => {
  try {
    let checkBasicDetail = await Vcard_URL_model.findOne({
      URL_Alies: req.params.URL_Alies,
    });
    if (!checkBasicDetail) {
      return res.status(400).json({ message: "VCard URL Data Not Found!" });
    } else {
      let getDatas = await BankModel.find();
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
export const Create_BankDetails = async (req, res) => {
  if (!req.body.URL_Alies || !req.body.HolderName || !req.body.BankName ||  !req.body.IFSCCode || !req.body.AccountNumber) {
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
      URL_Alies: req.params.URL_Alies,
    });

    if (!checkBasicDetailLength) {
      return res.status(400).json({ message: "This VCard URL doesn't exist!" });
    } else {
      let checkBasicData = await BankModel.findOne({
        URL_Alies: req.params.URL_Alies,
      });

      if (checkBasicData) {
        return res.status(400).json({ message: "Bank Details Already Saved!" });
      } else {
        let data = {
          UserName: req.user.UserName,
          URL_Alies: req.params.URL_Alies,
          HolderName: req.body.HolderName,
          BankName: req.body.BankName,
         
          IFSCCode:req.body.IFSCCode,
          AccountNumber:req.body.AccountNumber
        };
        let createDatas = new BankModel(data);
        try {
          await createDatas.save();
          return res.status(201).json({
            message: "Bank Detail's saved!",
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
};
//Update Specific document user data:

export const Update_SpecificDataWithURL = async (req, res) => {
  try {
    let data = req.body;

    let updateSpecificData = await BankModel.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Bank Detail's Updated!", data: updateSpecificData });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//Delete Specific User Bssic detail All data deleted By using user Id:
export const Delete_SpecificDataWithURL = async (req, res) => {
  try {
    let deleteSpecificData = await BankModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });
    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Bank Detail's Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update Specific document withId

export const updateSpecificUserData_Id = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await BankModel.findByIdAndUpdate(id, data);

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Bank Detail's Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await BankModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Bank Detail's Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

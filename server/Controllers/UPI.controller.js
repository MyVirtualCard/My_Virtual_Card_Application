import UPIModel from "../Models/UPI.model.js";
import Vcard_URL_model from "../Models/Vcard_URL.model.js";
import UserModel from "../Models/User.model.js";
//Get Async allback function..All user basicdata fetching :
export const Get_UPIDataWithURL = async (req, res) => {
  try {
    let checkBasicDetail = await Vcard_URL_model.findOne({
      URL_Alies: req.params.URL_Alies,
    });
    if (!checkBasicDetail) {
      return res.status(400).json({ message: "UPI Data Not Found!" });
    } else {
      let getDatas = await UPIModel.find();
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
export const Create_UPIData = async (req, res) => {

  let checkUserPlan = await UserModel.find({
    UserName: req.user.UserName,
  });

  if (checkUserPlan[0].Paid != true) {
    return res.status(400).json({ message: "Choose your Plan first!" });
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
      let checkBasicData = await UPIModel.findOne({
        URL_Alies: req.params.URL_Alies,
      });

      if (checkBasicData) {
        return res.status(400).json({ message: "UPI Data Already Saved!" });
      } else {
        let data = {
            UserName: req.user.UserName,
          URL_Alies: req.params.URL_Alies,
          gpay: req.body.gpay,
          paytm: req.body.paytm,
          phonepay: req.body.phonepay,
          UPI_Type:req.body.UPI_Type,
          QRCodeImage:req.body.QRCodeImage
        };
        let createDatas = new UPIModel(data);
        try {
          await createDatas.save();
          return res.status(201).json({
            message: "UPI Detail's saved!",
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
export const Update_SpecificUserDataWithURL = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;

    let updateSpecificData = await UPIModel.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "UPI Data Updated!", data: updateSpecificData });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
//Delete Specific User Bssic detail All data deleted By using user Id:
export const Delete_SpecificUserDataWithURL = async (req, res) => {
  try {
    let deleteSpecificData = await UPIModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });
    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "UPI Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

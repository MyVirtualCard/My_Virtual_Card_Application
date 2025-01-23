import BasicDetail_Model from "../Models/BasicDetail.model.js";
import Vcard_URL_model from "../Models/Vcard_URL.model.js";
import PaymentModel from "../Models/Payment.model.js";
import UserModel from "../Models/User.model.js";
//DiskStorage:

//Get Async allback function..All user basicdata fetching :
export const getBasicAllData = async (req, res) => {
  try {
    let checkBasicDetail = await Vcard_URL_model.findOne({
      URL_Alies: req.params.URL_Alies,
    });
    if (!checkBasicDetail) {
      return res.status(400).json({ message: "Basic Data Not Found!" });
    } else {
      let getDatas = await BasicDetail_Model.find();
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
export const postBasicAllData = async (req, res) => {
  if (
    !req.body.URL_Alies ||
    !req.body.Email ||
    !req.body.MobileNumber ||
    !req.body.Location
  ) {
    return res.status(401).json({ message: "All * fields Required" });
  }
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
          URL_Alies: req.params.URL_Alies
        });
  
        if (!checkBasicDetailLength) {
          return res
            .status(400)
            .json({ message: "This VCard URL doesn't exist!" });
        } else {
          let checkBasicData = await BasicDetail_Model.findOne({
            URL_Alies: req.params.URL_Alies,
          });
  
          if (checkBasicData) {
            return res.status(400).json({ message: "Basic Data Already Saved!" });
          } else {
            let data = {
                UserName: req.user.UserName,
              URL_Alies: req.params.URL_Alies,
              Email: req.body.Email,
              MobileNumber: req.body.MobileNumber,
              AlternateEmail: req.body.AlternateEmail,
              AlternateMobileNumber: req.body.AlternateMobileNumber,
              Location: req.body.Location,
              Website_URL: req.body.Website_URL,
            };
            let createDatas = new BasicDetail_Model(data);
            try {
              await createDatas.save();
              return res.status(201).json({
                message: "BasicDetail's saved!",
                length: createDatas.length,
                data: createDatas,
              });
            } catch (error) {
              return res.status(401).json({ message: error.message });
            }
          }
        }
      } else {
        res.status(400).json({ message: "Plan not match!" });
      }

  // if (checkCurrentPlan.length <= 0) {
  //   return res.status(400).json({ message: "Choose your Plan first!" });
  // } else {

  // }
};
//Read or get Specific User basic Data  :
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await BasicDetail_Model.find({
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

export const updateSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;

    let updateSpecificData = await BasicDetail_Model.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "BasicDetail's Updated!", data: updateSpecificData });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};
//Read or get Specific User basic Data  :
export const readSpecificIdUserData = async (req, res) => {
  try {
    let { id } = req.params;
    let getSpecificIdData = await BasicDetail_Model.findById(id);

    if (!getSpecificIdData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res.status(201).json({
        message: "Data Fetched!",
        length: getSpecificIdData.length,
        data: getSpecificIdData,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await BasicDetail_Model.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });
    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "BasicDetail's Deleted!", data: deleteSpecificData });
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
    let updateSpecificData = await BasicDetail_Model.findByIdAndUpdate(id, data);

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "BasicDetail Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await BasicDetail_Model.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "BasicDetail's Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


import AboutDetails from "../Model/About.model.js";
import Vcard_URL from "../Model/Vcard_URL.model.js";
import Payment from "../Model/Payment.model.js";
import currentPlan from "../Model/Plan.model.js";
//DiskStorage:

//Get Async allback function..All user basicdata fetching :
export const getAboutAllData = async (req, res) => {
  try {
    let checkBasicDetail = await Vcard_URL.findOne({
      URL_Alies: req.params.URL_Alies,
    });
    if (!checkBasicDetail) {
      return res.status(400).json({ message: "About Data Not Found!" });
    } else {
      let getDatas = await AboutDetails.find();
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
export const postAboutAllData = async (req, res) => {
  if (
    !req.body.URL_Alies ||
    !req.body.CompanyName ||
    !req.body.Category ||
    !req.body.Year ||
    !req.body.Bussiness ||
    !req.body.Specialities 
  ) {
    return res.status(401).json({ message: "All * fields Required" });
  }
  let checkCurrentPlan = await Payment.find({
    user: req.user.userName,
  });
  let checkFreePlan = await currentPlan.find({
    user: req.user.userName,
  });
  
  if (!checkCurrentPlan || !checkFreePlan) {
    return res.status(400).json({ message: "Plan not be there!" });
  };
      //All plan
      if (
        checkFreePlan[0]?.PlanPrice === 0 ||
        checkCurrentPlan[0]?.amount === 599 ||
        checkCurrentPlan[0]?.amount === 899 ||
        checkCurrentPlan[0]?.amount === 1499
      ) {
        let checkBasicDetailLength = await Vcard_URL.findOne({
          URL_Alies: req.params.URL_Alies
        });
  
        if (!checkBasicDetailLength) {
          return res
            .status(400)
            .json({ message: "This VCard URL doesn't exist!" });
        } else {
          let checkBasicData = await AboutDetails.findOne({
            URL_Alies: req.params.URL_Alies,
          });
  
          if (checkBasicData) {
            return res.status(400).json({ message: "Basic Data Already Saved!" });
          } else {
            let data = {
              user: req.user.userName,
              URL_Alies: req.params.URL_Alies,
              CompanyName:req.body.CompanyName,
              Category:req.body.Category ,
              Year:req.body.Year ,
              Bussiness:req.body.Bussiness ,
              Specialities: req.body.Specialities
            };
            let createDatas = new AboutDetails(data);
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
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await AboutDetails.find({
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

    let updateSpecificData = await AboutDetails.findOneAndUpdate(
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
//Read or get Specific User basic Data  :
export const readSpecificIdUserData = async (req, res) => {
  try {
    let { id } = req.params;
    let getSpecificIdData = await AboutDetails.findById(id);

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
    let deleteSpecificData = await AboutDetails.deleteMany({
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


//Update Specific document withId

export const updateSpecificUserData_Id = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await AboutDetails.findByIdAndUpdate(id, data);

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "About Data Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await AboutDetails.findByIdAndDelete(id);

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

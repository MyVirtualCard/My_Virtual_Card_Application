import TermConditionModel from "../Models/Terms&Condition.model.js";
import currentPlan from "../Models/Plan.model.js";
//Post basic detail data to database:

export const PostTermConditionsData = async (req, res) => {
  try {
    if (!req.body.Terms_Conditions) {
      return res.status(401).json({ message: "Mandatory:Terms & Conditions" });
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
        let checkTermsLength = await TermConditionModel.find({
          URL_Alies: req.params.URL_Alies
        });

        if (!checkTermsLength) {
          return res.status(400).json({ message: "Term & Condition  not be there!" });
        } else {
          //Basic Image File limit checked:
          if (checkTermsLength.length < 1) {
            // Create a new image instance and save to MongoDB
            const newTerms= new TermConditionModel({
              user: req.user.userName,
              URL_Alies:req.params.URL_Alies,
              Terms_Conditions: req.body.Terms_Conditions
            });

            await newTerms
              .save()
              .then(() => {
                res.status(200).json({
                  message: "Terms & Conditions saved!",
                  data: newTerms,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({
                  message: "Failed to save Terms & Conditions!",
                });
              });
          } else {
            res.status(400).json({
              message: "Already Terms & Condition saved ! ",
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

export const GetTermConditionsData = async (req, res) => {
  try {
    let datas = await TermConditionModel.find({URL_Alies: req.params.URL_Alies});
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
    let getSpecificData = await TermConditionModel.find({
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
    let getSpecificData = await TermConditionModel.findById(id);

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
    let data = req.body;
    let updateSpecificData = await TermConditionModel.findOneAndUpdate( { URL_Alies: req.params.URL_Alies }, data);

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
    let deleteSpecificData = await TermConditionModel.deleteMany({
      user: req.user.userName,
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

    let deleteSpecificData = await TermConditionModel.findOneAndDelete({ URL_Alies: req.params.URL_Alies });

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


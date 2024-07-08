import currentPlan from "../Models/Plan.model.js";

//Post plan detail data to database:
export const PostPlanData = async (req, res) => {
  try {
    if (!req.body.PlanPrice) {
      return res.status(401).json({ message: "Plan Not been Choosen!" });
    }
    let getSpecificData = await currentPlan.find({ user: req.user.userName });

    if (getSpecificData.length >= 1) {
      return res.status(401).json({ message: `Plan Already Selected!` });
    } else {
      let data = {
        user: req.user.userName,
        URL_Alies: req.body.URL_Alies,
        currentPlan: req.body.currentPlan,
        PlanPrice: req.body.PlanPrice,
      };

      const result = await currentPlan.create(data);

      return res.status(201).json({ message: "Plan saved!", data: result });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Read or get all user plan data  from database:

export const GetPlanData = async (req, res) => {
  try {
    let datas = await currentPlan.find({ URL_Alies: req.params.URL_Alies});
    if (!datas) {
      res.status(400).json({ message: "Data not found" });
    } else {
      res.status(201).json({
        message: "Data Fetched!",
        data: datas,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// //Read or get Specific User all Data  :
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await currentPlan.find({ user: req.user.userName });

    if (!getSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res
        .status(201)
        .json({
          message: " Data Fetched!",
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
    let getSpecificData = await currentPlan.findById(id);

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res.status(201).json({ message: " Data Fetched", data: getSpecificData });
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
    let updateSpecificData = await currentPlan.findByIdAndUpdate(id, data);

    if (!updateSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
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
    let deleteSpecificData = await currentPlan.deleteMany({
      user: req.user.userName,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "All Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await currentPlan.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: " Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
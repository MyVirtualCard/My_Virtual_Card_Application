
import AppoinmentModel from "../Model/Appoinment.model.js";

//Post basic detail data to database:
export const PostAppoinmentData = async (req, res) => {
  try {
    if (!req.body.FullName || !req.body.MobileNumber || !req.body.Date || !req.body.Time) {
      return res.status(401).json({ message: "All * fields are Mandatory!" });
    }
    
            // Create a new image instance and save to MongoDB
            const newAppoinment = new AppoinmentModel({
              URL_Alies: req.params.URL_Alies,
              FullName: req.body.FullName,
              Date: req.body.Date,
              MobileNumber:req.body.MobileNumber,
              Time: req.body.Time,
      
            });

            await newAppoinment.save()
              .then(() => {
                res.status(200).json({
                  message: "Your Appoinment Placed!",
                  data: newAppoinment,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({
                  message: "Failed to send your Appoinment!",
                });
              });
      
  


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// //Read or get Specific User all Data  :
export const readSpecificUserData = async (req, res) => {
  try {
    let getSpecificData = await AppoinmentModel.find({
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
    res.status(400).json({ error: error.message });
  }
};
// //Read or get Specific User all Data  :
export const getSpecificIdData = async (req, res) => {
  try {
    let { id } = req.params;
    let getSpecificData = await AppoinmentModel.findById(id);

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
    let updateSpecificData = await AppoinmentModel.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data,
      { new: true }
    );

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
    let deleteSpecificData = await AppoinmentModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Data Deleted", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await AppoinmentModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found" });
    } else {
      res
        .status(201)
        .json({ message: "Data Deleted", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

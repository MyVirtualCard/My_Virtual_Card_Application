import FeedbackModel from "../Model/Feedback.model.js";
import fs from "fs";
import Payment from "../Model/Payment.model.js";
import multer from "multer";
// Import necessary functions from the url and path modules
import { fileURLToPath } from "url";
// Convert the URL of the current module to a filename
const __filename = fileURLToPath(import.meta.url);
// Extract the directory name from the filename
const __dirname = path.dirname(__filename);
import path from "path";

//Read or get all user basicDetail data  from database:

export const GetFeedbackData = async (req, res) => {
  try {
    let datas = await FeedbackModel.find({URL_Alies: req.params.URL_Alies});
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

export const PostFeedbackData = async (req, res) => {

      if (!req.params.URL_Alies,!req.body.ClientName,!req.body.ClientFeedback) {
        return res.status(400).json({ message: "All * field Mandatory!" });
      };
          // Create a new image instance and save to MongoDB
          const newFeedback = new FeedbackModel({
            URL_Alies:req.params.URL_Alies,
            ClientName:req.body.ClientName,
            ClientFeedback:req.body.ClientFeedback,
            ClientRatting:req.body.ClientRatting
            
          });
          newFeedback
            .save()
            .then(() => {
              res.status(200).json({
                message: "Feedback Sended!",
                data: newFeedback,
              });
            })
            .catch((err) => {
              res.status(400).json({
                message: "Failed to send feedback to database!",
             err:err.message
              });
            });
      
  


  



};

// //Read or get Specific User all Data  :
export const readSpecificUserData = async (req, res) => {
  try {
    let getSpecificData = await FeedbackModel.find({  URL_Alies:req.params.URL_Alies });

    if (!getSpecificData) {
      res.status(400).json({ message: " Data Not Found!" });
    } else {
      res.status(201).json({
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
    let getSpecificData = await FeedbackModel.findById(id);

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
    let updateSpecificData = await FeedbackModel.findByIdAndUpdate(id, data);

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
export const deleteSpecificUserData = async (req, res) => {
  try {
    let deleteSpecificData = await FeedbackModel.deleteMany({
      URL_Alies:req.params.URL_Alies
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

export const deleteSpecificIdData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await FeedbackModel.findByIdAndDelete(id);

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


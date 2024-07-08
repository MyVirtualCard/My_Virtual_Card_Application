import GalleryModel from "../Models/Gallery.model.js";
import currentPlan from "../Models/Plan.model.js";
import fs from "fs";
import multer from "multer";
// Import necessary functions from the url and path modules
import { fileURLToPath } from "url";
// Convert the URL of the current module to a filename
const __filename = fileURLToPath(import.meta.url);
// Extract the directory name from the filename
const __dirname = path.dirname(__filename);
import path from "path";
import upload from "../Multer/config.js";

//Read or get all user basicDetail data  from database:

export const GetGalleryData = async (req, res) => {
  try {
    let datas = await GalleryModel.find({URL_Alies: req.params.URL_Alies});
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

export const PostGalleryData = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File size too large. Maximum limit is 2MB." });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      res.status(400).json({ message: err });
    } else {
      if (!req.body.GalleryImage) {
        return res.status(400).json({ message: "No file choosen!" });
      }

      let checkCurrentPlan = await currentPlan.find({
        user: req.user.userName,
      });

      if (!checkCurrentPlan) {
        return res
          .status(400)
          .json({ message: "Choose your Plan first!", error: err });
      }
      if(checkCurrentPlan.length <=0){
        return res
        .status(400)
        .json({ message: "Choose your Plan first!", error: err });
      }else{
    //Plan 2 and 3
    if (checkCurrentPlan[0].PlanPrice === 10 || checkCurrentPlan[0].PlanPrice === 365 || checkCurrentPlan[0].PlanPrice === 799 || checkCurrentPlan[0].PlanPrice === 1499) {
      //check images
      let checkCurrentImages = await GalleryModel.find({
        URL_Alies:req.params.URL_Alies
      });

      if (!checkCurrentImages) {
        return res
          .status(400)
          .json({ message: "Image will not be there!", error: err });
      } else {
      
        if(checkCurrentPlan[0].PlanPrice === 1499){
            //Basic Image File limit checked:
        if (checkCurrentImages.length < 10) {
          // Create a new image instance and save to MongoDB
          const newImage = new GalleryModel({
            user: req.user.userName,
            URL_Alies:req.body.URL_Alies,
            GalleryURL:req.body.GalleryURL,
            GalleryName:req.body.GalleryName,
            GalleryImage:req.body.GalleryImage
            // GalleryImage: {
            //   data: fs.readFileSync( 'public/' + req.file.filename),
            //   contentType: req.file.mimetype,
            // },
          });

          newImage
            .save()
            .then(() => {
              res.status(200).json({
                message: "Image uploaded!",
                data: newImage,
              });
            })
            .catch((err) => {
              res.status(400).json({
                message: "Failed to save image to database!",
             
              });
            });
        } else {
          res.status(400).json({
            message: "Max Image Upload limit crossed!..Only accept 10 Images ",
         
          });
        }
        };
        if(checkCurrentPlan[0].PlanPrice === 365 || checkCurrentPlan[0].PlanPrice === 799){
          //Basic Image File limit checked:
      if (checkCurrentImages.length < 5) {
        // Create a new image instance and save to MongoDB
        const newImage = new GalleryModel({
          user: req.user.userName,
          URL_Alies:req.body.URL_Alies,
          GalleryURL:req.body.GalleryURL,
          GalleryImage:req.body.GalleryImage
          // GalleryName:req.body.GalleryName,
          // GalleryImage: {
          //   data: fs.readFileSync("public/" + req.file.filename),
          //   contentType: req.file.mimetype,
          // },
          // GalleryImage: {
          //   data: fs.readFileSync("uploads/" + req.file.filename),
          //   contentType: req.file.mimetype,
          // },
        });
 
        newImage
          .save()
          .then(() => {
            res.status(200).json({
              message: "Image uploaded!",
              data: newImage,
            });
          })
          .catch((err) => {
            res.status(400).json({
              message: "Failed to save image to database!",
          
            });
          });
      } else {
        res.status(400).json({
          message: "Max Image Upload limit crossed!..Only accept 5 Images ",
    
        });
      }
      }
      if(checkCurrentPlan[0].PlanPrice === 10){
        //Basic Image File limit checked:
    if (checkCurrentImages.length < 2) {
      // Create a new image instance and save to MongoDB
      const newImage = new GalleryModel({
        user: req.user.userName,
        URL_Alies:req.body.URL_Alies,
        GalleryURL:req.body.GalleryURL,
        GalleryImage:req.body.GalleryImage,
        // GalleryName:req.body.GalleryName,
        // GalleryImage: {
        //   data: fs.readFileSync("public/" + req.file.filename),
        //   contentType: req.file.mimetype,
        // },
        // GalleryImage: {
        //   data: fs.readFileSync("uploads/" + req.file.filename),
        //   contentType: req.file.mimetype,
        // },
      });

      newImage
        .save()
        .then(() => {
          res.status(200).json({
            message: "Image uploaded!",
            data: newImage,
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Failed to save image to database!",
        
          });
        });
    } else {
      res.status(400).json({
        message: "Demo Plan Only accept 2 Images ",

      });
    }
    };
      }
    } else {
      res.status(400).json({ message: "Plan not match!", error: err });
    }
    
      }

  

    }
  });
};

// //Read or get Specific User all Data  :
export const readSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await GalleryModel.find({  URL_Alies:req.params.URL_Alies });

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
    let getSpecificData = await GalleryModel.findById(id);

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
    let updateSpecificData = await GalleryModel.findByIdAndUpdate(id, data);

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
    let deleteSpecificData = await GalleryModel.deleteMany({
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

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await GalleryModel.findByIdAndDelete(id);

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

//Post basic detail data to database:

// export const PostGalleryData = async (req, res) => {
//   try {
//     if (!req.file.filename) {
//       return res.status(401).json({ message: "All * fields are Mandatory" });
//     } else {
//       let data = {
//         user: req.user.userName,
//         GalleryImage: {
//           data: fs.readFileSync("Gallery/" + req.file.filename),
//           contentType:'image/png/jpg'
//         },
//         GalleryURL: req.body.GalleryURL,
//       };

//       const result = await GalleryModel.create(data);

//       return res.status(201).json({ message: "Data saved!", data: result });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

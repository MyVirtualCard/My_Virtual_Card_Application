
import Vcard_URL_model from "../Models/Vcard_URL.model.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
// Create __dirname manually in ES module
import { URLUpload } from "../Multer/URL_multer.js";

const uploadFields = URLUpload.fields([
  { name: "Profile", maxCount: 1 }, // One profile image
  { name: "Banner", maxCount: 1 },
]);

//DiskStorage:
//All user URL Data :
export const getAllVCardURLData = async (req, res) => {
  try {
    let getDatas = await Vcard_URL_model.find({});
    return res.status(201).json({
      message: "All Data Fetched sucessfully!",
      length: getDatas.length,
      data: getDatas,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
//Get Async allback function..All user basicdata fetching :
export const getSpecificUserVCardURLData = async (req, res) => {
  try {
    let{UserName}=req.body;
    let getDatas = await Vcard_URL_model.find({UserName });
    return res.status(201).json({
      message: "Data Fetched sucessfully!",
      length: getDatas.length,
      data: getDatas,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
//Post Async allback function :
export const CreateVCardURLData = async (req, res) => {
  {
    uploadFields(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors like file size limit
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ message: "File too large. Maximum size allowed is 3MB." });
        }
        return res
          .status(500)
          .json({ message: `Multer error: ${err.message}` });
      } else if (err) {
        // Handle other errors
        return res.status(500).json({ message: `Error: ${err.message}` });
      }
      if (
        !req.body.URL_Alies ||
        !req.body.VCardName ||
        !req.body.FirstName ||
        !req.body.LastName ||
        !req.body.Profession
      ) {
        return res.status(401).json({ message: "All * fields Required" });
      }

      let checkVCardURLDetail = await Vcard_URL_model.findOne({
        URL_Alies: req.body.URL_Alies,
      });

      if (req.body.URL_Alies.length < 5) {
        return res
          .status(400)
          .json({ message: "URL_Alies Minimum 5 character Required!" });
      }
      if (checkVCardURLDetail) {
        return res
          .status(400)
          .json({ message: "This VCard URL already alies!" });
      } else {
        //Basic Image File limit checked:
        const Profile = req.files["Profile"]
          ? req.files["Profile"][0].path
          : '';
        const Banner = req.files["Banner"] ? req.files["Banner"][0].path : '';

        let data = {
          UserName: req.user.UserName,
          URL_Alies: req.body.URL_Alies,
          VCardName: req.body.VCardName,
          BussinessType:req.body.BussinessType,
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Profession: req.body.Profession,
          Profile: Profile,
          Banner: Banner,
          ProfileType: req.body.ProfileType,
          BannerType: req.body.BannerType,
          ProfileAddress: req.body.ProfileAddress,
          BannerAddress: req.body.BannerAddress,
        };
        let createDatas = new Vcard_URL_model(data);
        try {
          await createDatas.save();
          return res.status(201).json({
            message: "New VCard Created!",
            length: createDatas.length,
            data: createDatas,
          });
        } catch (error) {
          return res.status(401).json({ message: error.message });
        }
      }
    });
  }
};

//Read or get Specific User basic Data  :
export const readSpecificUserDataWithURL = async (req, res) => {
  let { URL_Alies } = req.params;
  try {
    let getSpecificData = await Vcard_URL_model.findOne({
      URL_Alies: req.params.URL_Alies,
    });

    if (!getSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
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
//Read or get Specific User basic Data  :
export const readSpecificIdUserData = async (req, res) => {
  try {
    let { id } = req.params;
    let getSpecificIdData = await Vcard_URL_model.findById(id);

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
//Update Specific document user data:

export const updateSpecificUserData = async (req, res) => {
  try {
    {
      uploadFields(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          // Handle Multer-specific errors like file size limit
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              message: "File too large. Maximum size allowed is 3MB.",
            });
          }
          return res
            .status(500)
            .json({ message: `Multer error: ${err.message}` });
        } else if (err) {
          // Handle other errors
          return res.status(500).json({ message: `Error: ${err.message}` });
        }
      });
      let { URL_Alies } = req.params;

      let checkSpecificUserIdData = await Vcard_URL_model.findOne({ URL_Alies });
      const updateSpecificData = await Vcard_URL_model.findByIdAndUpdate(
        checkSpecificUserIdData._id
      );
      if (!checkSpecificUserIdData) {
        res.status(400).json({ message: "Data Not Found!" });
      } else {
        //Basic Image File limit checked:
        const Profile = req.files["Profile"]
          ? req.files["Profile"][0].path
          : null;
        const Banner = req.files["Banner"] ? req.files["Banner"][0].path : null;

        if (checkSpecificUserIdData.ProfileType === "ImageUpload") {
          if (req.files.Profile) {
            fs.unlink(checkSpecificUserIdData.Profile, (err) => {
              if (err) {
                console.error("Failed to delete the old image:", err);
              }
            });
            updateSpecificData.Profile = Profile; // Set new image path
          }
        }
        if (checkSpecificUserIdData.BannerType === "ImageUpload") {
          if (req.files.Banner) {
            fs.unlink(checkSpecificUserIdData.Banner, (err) => {
              if (err) {
                console.error("Failed to delete the old image:", err);
              }
            });
            updateSpecificData.Banner = Banner; // Set new image path
          }
        }
        updateSpecificData.VCardName = req.body.VCardName;
        updateSpecificData.BussinessType=req.body.BussinessType,
        updateSpecificData.FirstName = req.body.FirstName;
        updateSpecificData.LastName = req.body.LastName;
        updateSpecificData.Profession = req.body.Profession;
        updateSpecificData.ProfileType = req.body.ProfileType;
        updateSpecificData.BannerType = req.body.BannerType;
        updateSpecificData.ProfileAddress = req.body.ProfileAddress;
        updateSpecificData.BannerAddress = req.body.BannerAddress;

        let updateURLFormData = await updateSpecificData.save();
        res
          .status(201)
          .json({ message: "Data Updated!", data: updateURLFormData });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
//Update Specific document withId

export const updateSpecificUserData_Id = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await Vcard_URL_model.findByIdAndUpdate(id, data);

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      //Basic Image File limit checked:
      const Profile = req.files["Profile"]
        ? req.files["Profile"][0].path
        : null;
      const Banner = req.files["Banner"] ? req.files["Banner"][0].path : null;
      // If a new image is uploaded, delete the old image
      if (req.files) {
        fs.unlink(updateSpecificData.Profile, (err) => {
          if (err) {
            console.error("Failed to delete the old image:", err);
          }
        });
        updateSpecificData.Profile = Profile; // Set new image path
      }
      if (req.files) {
        fs.unlink(updateSpecificData.Banner, (err) => {
          if (err) {
            console.error("Failed to delete the old image:", err);
          }
        });
        updateSpecificData.Banner = Banner; // Set new image path
      }

      product.name = req.body.name || product.name;
      updateSpecificData.VCardName = req.body.VCardName;
      updateSpecificData.BussinessType=req.body.BussinessType,
      updateSpecificData.FirstName = req.body.FirstName;
      updateSpecificData.LastName = req.body.LastName;
      updateSpecificData.Profession = req.body.Profession;
      updateSpecificData.ProfileType = req.body.ProfileType;
      updateSpecificData.BannerType = req.body.BannerType;
      updateSpecificData.ProfileAddress = req.body.ProfileAddress;
      updateSpecificData.BannerAddress = req.body.BannerAddress;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
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
    let deleteSpecificData = await Vcard_URL_model.deleteMany({
      URL_Alies: req.body.URL_Alies,
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

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let checkSpecificData = await Vcard_URL_model.findById(id);

    if (!checkSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      if (
        checkSpecificData.ProfileType === "ImageUpload" ||
        checkSpecificData.BannerType === "ImageUpload"
      ) {
        fs.unlink(checkSpecificData.Profile, (err) => {
          if (err) {
            console.error("Failed to delete the old image:", err);
          }
        });
        fs.unlink(checkSpecificData.Banner, (err) => {
          if (err) {
            console.error("Failed to delete the old image:", err);
          }
        });
        let deleteSpecificData = await Vcard_URL_model.findByIdAndDelete(id);
        res
          .status(201)
          .json({ message: "VCard Data Deleted!", data: deleteSpecificData });
      } else {
        let deleteSpecificData = await Vcard_URL_model.findByIdAndDelete(id);
        res
          .status(201)
          .json({ message: "VCard Data Deleted!", data: deleteSpecificData });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const deleteSpecificUserIdData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await Vcard_URL_model.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Data Deleted!", data: deleteSpecificData });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

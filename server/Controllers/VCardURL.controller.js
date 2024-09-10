import Vcard_URL from "../Model/Vcard_URL.model.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Create __dirname manually in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//DiskStorage:
//All user URL Data :
export const getAllVCardURLData = async (req, res) => {
  try {
    let getDatas = await Vcard_URL.find({});
    return res.status(201).json({
      message: "Data Fetched sucessfully!",
      length: getDatas.length,
      data: getDatas,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
//Get Async allback function..All user basicdata fetching :
export const getVCardURLData = async (req, res) => {
  try {
    let getDatas = await Vcard_URL.find({ user: req.user.userName });
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
export const postVCardURLData = async (req, res) => {
  if (!req.body.URL_Alies || !req.body.VCardName || !req.body.Description) {
    return res.status(401).json({ message: "All * fields Required" });
  }

  let checkVCardURLDetail = await Vcard_URL.findOne({
    URL_Alies: req.body.URL_Alies,
  });

  if (req.body.URL_Alies.length < 5) {
    return res
      .status(400)
      .json({ message: "URL_Alies Minimum 5 character Required!" });
  }
  if (checkVCardURLDetail) {
    return res.status(400).json({ message: "This VCard URL already alies!" });
  } else {
    //Basic Image File limit checked:
    // const Profile = req.files["Profile"] ? req.files["Profile"][0].path : null;
    // const Banner = req.files["Banner"] ? req.files["Banner"][0].path : null;

    let data = {
      user: req.user.userName,
      URL_Alies: req.body.URL_Alies,
      VCardName: req.body.VCardName,
      Description: req.body.Description,
      Profile: req.body.Profile,
      Banner: req.body.Banner,
      ProfileType: req.body.ProfileType,
      BannerType: req.body.BannerType,
      ProfileAddress: req.body.ProfileAddress,
      BannerAddress: req.body.BannerAddress,
    };
    let createDatas = new Vcard_URL(data);
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
};

//Read or get Specific User basic Data  :
export const readSpecificUserAllData = async (req, res) => {
  let { URL_Alies } = req.params;
  try {
    let getSpecificData = await Vcard_URL.findOne({
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
    let getSpecificIdData = await Vcard_URL.findById(id);

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
    let { URL_Alies } = req.params;
    let updateSpecificData = await Vcard_URL.findOneAndUpdate(URL_Alies);

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      //Basic Image File limit checked:
      // const Profile = req.files["Profile"]
      //   ? req.files["Profile"][0].path
      //   : null;
      // const Banner = req.files["Banner"] ? req.files["Banner"][0].path : null;

      // if (updateSpecificData.Profile !=null) {
      //   fs.unlink(updateSpecificData.Profile, (err) => {
      //     if (err) {
      //       console.error("Failed to delete the old image:", err);
      //     }
      //   });
      //   updateSpecificData.Profile = Profile; // Set new image path
      // }
      // Check if a new image is uploaded
      // if (Profile) {
      //   // Delete the old image from the file system
      //   const oldImagePath = path.join(
      //     __dirname,
      //     "uploads",
      //     "Basic_Image",
      //     updateSpecificData.Profile
      //   );
      //   if (fs.existsSync(oldImagePath)) {
      //     fs.unlink(oldImagePath); // Delete the old image
      //   }

      //   // Update the image path in the product
      //   updateSpecificData.Profile = Profile;
      // };
      // Check if a new image is uploaded
      // if (Profile) {
      //   // If product already has an image, delete the old one
      //   if (updateSpecificData.Profile) {
      //     const oldImagePath = path.join(
      //       __dirname,
      //       "uploads",
      //       "Basic_Image",
      //       updateSpecificData.Profile
      //     );
      //     if (fs.existsSync(oldImagePath)) {
      //       fs.unlinkSync(oldImagePath); // Delete the old image
      //     }
      //   }

      //   // Update with the new image path
      //   updateSpecificData.Profile = Profile;
      // }
      // if (Banner) {
      //   fs.unlink(updateSpecificData.Banner, (err) => {
      //     if (err) {
      //       console.error("Failed to delete the old image:", err);
      //     }
      //   });
      //   updateSpecificData.Banner = Banner; // Set new image path
      // };
      // if (Banner) {
      //   // Delete the old image from the file system
      //   const oldImagePath = path.join(
      //     __dirname,
      //     "uploads",
      //     "Basic_Image",
      //     updateSpecificData.Banner
      //   );
      //   if (fs.existsSync(oldImagePath)) {
      //     fs.unlink(oldImagePath); // Delete the old image
      //   }

      //   // Update the image path in the product
      //   updateSpecificData.Banner = Banner;
      // }
      updateSpecificData.Banner = req.body.Banner;
      updateSpecificData.Profile = req.body.Profile;
      updateSpecificData.URL_Alies = req.body.URL_Alies;
      updateSpecificData.VCardName = req.body.VCardName;
      updateSpecificData.Description = req.body.Description;
      updateSpecificData.ProfileType = req.body.ProfileType;
      updateSpecificData.BannerType = req.body.BannerType;
      updateSpecificData.ProfileAddress = req.body.ProfileAddress;
      updateSpecificData.BannerAddress = req.body.BannerAddress;
      let updateURLFormData = await updateSpecificData.save();
      res
        .status(201)
        .json({ message: "Data Updated!", data: updateURLFormData });
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
    let updateSpecificData = await Vcard_URL.findByIdAndUpdate(id, data);

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      //Basic Image File limit checked:
      const Profile = req.files["Profile"]
        ? req.files["Profile"][0].path
        : null;
      const Banner = req.files["Banner"] ? req.files["Banner"][0].path : null;
      // If a new image is uploaded, delete the old image
      if (req.file) {
        fs.unlink(updateSpecificData.Profile, (err) => {
          if (err) {
            console.error("Failed to delete the old image:", err);
          }
        });
        updateSpecificData.Profile = Profile; // Set new image path
      }
      if (req.file) {
        fs.unlink(updateSpecificData.Banner, (err) => {
          if (err) {
            console.error("Failed to delete the old image:", err);
          }
        });
        updateSpecificData.Banner = Banner; // Set new image path
      }

      product.name = req.body.name || product.name;
      updateSpecificData.URL_Alies = req.body.URL_Alies;
      updateSpecificData.VCardName = req.body.VCardName;
      updateSpecificData.Description = req.body.Description;
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
    let deleteSpecificData = await Vcard_URL.deleteMany({
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

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await Vcard_URL.findByIdAndDelete(id);

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

import Vcard_URL from "../Model/Vcard_URL.model.js";

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
    const profileFile = req.files["Profile"][0];
    const bannerFile = req.files["Banner"][0];
    let data = {
      user: req.user.userName,
      URL_Alies: req.body.URL_Alies,
      VCardName: req.body.VCardName,
      Description: req.body.Description,
      Profile: {
        filename: profileFile.filename,
        contentType: profileFile.mimetype,
        imageBase64: req.file?.path,
      },
      Banner: {
        filename: bannerFile.filename,
        contentType: bannerFile.mimetype,
        imageBase64: req.file?.path,
      },
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
    let { id } = req.params;
        //Basic Image File limit checked:
        const profileFile = req.files["Profile"][0];
        const bannerFile = req.files["Banner"][0];
        let data = {
          URL_Alies: req.body.URL_Alies,
          VCardName: req.body.VCardName,
          Description: req.body.Description,
          Profile: {
            filename: profileFile.filename,
            contentType: profileFile.mimetype,
            imageBase64: req.file?.path,
          },
          Banner: {
            filename: bannerFile.filename,
            contentType: bannerFile.mimetype,
            imageBase64: req.file?.path,
          },
          ProfileType: req.body.ProfileType,
          BannerType: req.body.BannerType,
          ProfileAddress: req.body.ProfileAddress,
          BannerAddress: req.body.BannerAddress,
        };
    let updateSpecificData = await Vcard_URL.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data
    );

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
//Update Specific document withId

export const updateSpecificUserData_Id = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await Vcard_URL.findByIdAndUpdate(id, data);

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

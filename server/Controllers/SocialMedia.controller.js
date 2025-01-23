
import SocialMedia_Model from "../Models/SocialMedia.model.js";
//Read or get all user basicDetail data  from database:

export const Get_SocialMediaDataWithURL = async (req, res) => {
  try {
    let datas = await SocialMedia_Model.find({
      URL_Alies: req.params.URL_Alies,
    });
    if (!datas) {
      res
        .status(400)
        .json({
          message: "Data not found!",
          length: datas.length,
          data: datas,
        });
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
//Post basic detail data to database:
export const Create_SocialMediaData = async (req, res) => {
  try {
    if (!req.body.WhatsUp) {
      return res.status(401).json({ message: "Mandatory:WhatsUp" });
    }

    //check images
    let checkSocialMediaLength = await SocialMedia_Model.findOne({
      URL_Alies: req.params.URL_Alies,
    });

    if (!checkSocialMediaLength) {
        // Create a new image instance and save to MongoDB
        const newSocialMedia = new SocialMedia_Model({
          UserName: req.user.UserName,
          URL_Alies: req.params.URL_Alies,
      
          Facebook: req.body.Facebook,
          LinkedIn: req.body.LinkedIn,
          WhatsUp: req.body.WhatsUp,
          Instagram: req.body.Instagram,
          Twiter: req.body.Twiter,
          YouTube: req.body.YouTube,
          Github: req.body.Github,
        });

        await newSocialMedia
          .save()
          .then(() => {
            res.status(200).json({
              message: "SocialMedia Links uploaded!",
              data: newSocialMedia,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({
              message: "Failed to save SocialMedia Details!",
            });
          });
    } else {
      //SocialMedia Image File limit checked:
      if (checkSocialMediaLength.length < 1) {
        // Create a new image instance and save to MongoDB
        const newSocialMedia = new SocialMedia_Model({
          user: req.user.userName,
          URL_Alies: req.params.URL_Alies,
 
          Facebook: req.body.Facebook,
          LinkedIn: req.body.LinkedIn,
          WhatsUp: req.body.WhatsUp,
          Instagram: req.body.Instagram,
          Twiter: req.body.Twiter,
          YouTube: req.body.YouTube,
          Github: req.body.Github,
        });

        await newSocialMedia
          .save()
          .then(() => {
            res.status(200).json({
              message: "SocialMedia Links uploaded!",
              data: newSocialMedia,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({
              message: "Failed to save SocialMedia Details!",
            });
          });
      } else {
        res.status(400).json({
          message: "Already all your Link saved ! ",
        });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update Specific document user data:

export const Update_SpecificUserDataWithURL = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await SocialMedia_Model.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "SocialMedia's Updated!", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Delete Specific User Bssic detail All data deleted By using user Id:
export const Delete_SpecificUserDataWithURL = async (req, res) => {
  try {
    let deleteSpecificData = await SocialMedia_Model.deleteMany({
      URL_Alies: req.params.URL_Alies,
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



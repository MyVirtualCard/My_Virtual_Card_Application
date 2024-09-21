
import VideoModel from "../Model/Video.model.js";
import currentPlan from "../Model/Plan.model.js";
import Payment from "../Model/Payment.model.js";
//Read or get all user basicDetail data  from database:

export const getVideoData = async (req, res) => {
  try {
    let datas = await VideoModel.find({URL_Alies: req.params.URL_Alies});
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

//Post basic detail data to database:

export const postVideoData = async (req, res) => {
  try {
    if (!req.body.Video) {
      return res.status(401).json({ message: "All * fields are Mandatory!" });
    }
    let checkCurrentPlan = await Payment.find({
      user: req.user.userName,
    });
    let checkFreePlan = await currentPlan.find({
      user: req.user.userName,
    });
    if (!checkCurrentPlan ||  !checkFreePlan) {
      return res
        .status(400)
        .json({ message: "Plan not be there!"});
    };
         //Plan 2 and 3
         if (
          checkFreePlan[0]?.PlanPrice === 0 ||
          checkCurrentPlan[0]?.amount === 599 ||
          checkCurrentPlan[0]?.amount === 899 ||
          checkCurrentPlan[0]?.amount === 1299
        ) {
          //check images
          let checkTestimonialLength = await VideoModel.find({
            URL_Alies:req.params.URL_Alies
          });
  
          if (!checkTestimonialLength) {
            return res
              .status(400)
              .json({ message: "Client Data not be there!" });
          } else {
            if (checkCurrentPlan[0]?.amount === 1299) {
              //Basic Image File limit checked:
              if (checkTestimonialLength.length < 8) {
                // Create a new image instance and save to MongoDB
                const newTestimonial = new VideoModel({
                  user: req.user.userName,
                  URL_Alies:req.body.URL_Alies,
                  Video: req.body.Video,
                 
                });
  
                await newTestimonial
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: "Video saved",
                      data: newTestimonial,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(400).json({
                      message: "Failed to save video to database!",
                      
                    });
                  });
              } else {
                res.status(400).json({
                  message:"Max Slide Upload limit crossed..Only accept 8 Video's ",
            
                });
              }
            }
            if (checkCurrentPlan[0]?.amount === 899) {
              //Basic Image File limit checked:
              if (checkTestimonialLength.length < 6) {
                // Create a new image instance and save to MongoDB
                const newTestimonial = new VideoModel({
                  user: req.user.userName,
                  URL_Alies:req.body.URL_Alies,
                  Video: req.body.Video,
                });
  
                await newTestimonial
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: "Video uploaded",
                      data: newTestimonial,
                    });
                  })
                  .catch((err) => {
                  
                    res.status(400).json({
                      message: "Failed to save video to database!",
                     
                    });
                  });
              }
               else {
                res.status(400).json({
                  message:"Max Slide Upload limit crossed..Only accept 6 Video's ",
               
                });
              }
            }
            if (checkCurrentPlan[0]?.amount === 599) {
              //Basic Image File limit checked:
              if (checkTestimonialLength.length < 4) {
                // Create a new image instance and save to MongoDB
                const newTestimonial = new VideoModel({
                  user: req.user.userName,
                  URL_Alies:req.body.URL_Alies,
                  Video: req.body.Video,
                });
  
                await newTestimonial
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: "Video uploaded",
                      data: newTestimonial,
                    });
                  })
                  .catch((err) => {
                    console.log(err.message);
                    res.status(400).json({
                      message: "Failed to save video to database!",
                     
                    });
                  });
              } else {
                res.status(400).json({
                  message:"Max Slide Upload limit crossed..Only accept 4 Video's ",
              
                });
              }
            }
            if (checkFreePlan[0]?.PlanPrice === 0) {
              //Basic Image File limit checked:
              if (checkTestimonialLength.length < 2) {
                // Create a new image instance and save to MongoDB
                const newTestimonial = new VideoModel({
                  user: req.user.userName,
                  URL_Alies:req.body.URL_Alies,
                  Video: req.body.Video,
                });
  
                await newTestimonial
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: "Video  uploaded",
                      data: newTestimonial,
                    });
                  })
                  .catch((err) => {
                    console.log(err.message);
                    res.status(400).json({
                      message: "Failed to save video to database!",
                     
                    });
                  });
              } else {
                res.status(400).json({
                  message:"Max Slide Upload limit crossed..Only accept 2 Video's! ",
              
                });
              }
            }
          }
        } else {
          res.status(400).json({ message: "Plan not match!", error: err });
        }
    // if (checkCurrentPlan.length <= 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Choose your Plan first!"});
    // } else {
 
    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// //Read or get Specific User all Data  :
export const getSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await VideoModel.find({
      URL_Alies:req.params.URL_Alies
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
    let getSpecificData = await VideoModel.findById(id);

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
    let updateSpecificData = await VideoModel.findByIdAndUpdate(id, data);

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Video Updated", data: updateSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await VideoModel.deleteMany({
      URL_Alies:req.params.URL_Alies
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Video Deleted Sucessfully!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await VideoModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({ message: "Video Deleted Sucessfully!", data: deleteSpecificData });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


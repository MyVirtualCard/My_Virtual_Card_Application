import BussinessModel from "../Model/BussinessHour.model.js";
import Payment from "../Model/Payment.model.js";
import currentPlan from "../Model/Plan.model.js";
//Read or get all user basicDetail data  from database:

export const GetSocialMediaData = async (req, res) => {
  try {
    let datas = await BussinessModel.find({
      URL_Alies: req.params.URL_Alies,
    });
    if (!datas) {
      res.status(400).json({
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
export const PostSocialMediaData = async (req, res) => {

    let checkCurrentPlan = await Payment.find({
      user: req.user.userName,
    });
    let checkFreePlan = await currentPlan.find({
      URL_Alies: req.params.URL_Alies,
    });

    if (!checkCurrentPlan || !checkFreePlan) {
      return res.status(400).json({ message: "Choose your Plan first!" });
    };
      //Plan 2 and 3
      if (
        checkFreePlan[0]?.PlanPrice === 0 ||
        checkCurrentPlan[0]?.amount === 599 ||
        checkCurrentPlan[0]?.amount === 899 ||
        checkCurrentPlan[0]?.amount === 1499
      ) {
        //check images
        let checkBussinessHour = await BussinessModel.find({
          URL_Alies: req.params.URL_Alies,
        });

        if (!checkBussinessHour) {
           res
            .status(400)
            .json({ message: "Bussiness Hour Data will not be Inserted!" });
        } else {
          if (checkCurrentPlan[0]?.amount === 1499) {
            //Basic Image File limit checked:
            if (checkBussinessHour.length < 1) {
              // Create a new image instance and save to MongoDB
              const newBussinessHour = new BussinessModel({
                user: req.user.userName,
          URL_Alies: req.params.URL_Alies,
           Monday:{
            from:req.body.Monday.from,
            to:req.body.Monday.to
           },
           Tuesday:{
            from:req.body.Tuesday.from,
            to:req.body.Tuesday.to
           },
           Wednesday:{
            from:req.body.Wednesday.from,
            to:req.body.Wednesday.to
           },
           Thursday:{
            from:req.body.Thursday.from,
            to:req.body.Thursday.to
           },
           Friday:{
            from:req.body.Friday.from,
            to:req.body.Friday.to
           },
           Saturday:{
            from:req.body.Saturday.from,
            to:req.body.Saturday.to
           },
           Sunday:{
            from:req.body.Sunday.from,
            to:req.body.Sunday.to
           },
              });
  
              newBussinessHour
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Bussiness Timing uploaded!",
                    data: newBussinessHour,
                  });
                })
                .catch((err) => {
                  res.status(400).json({
                    message: "Failed to save Bussiness Timing to database!",
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max Bussiness Timing Upload limit crossed!..Only accept 1 Data List ",
              });
            }
          }
          if (
            checkCurrentPlan[0]?.amount === 599 ||
            checkCurrentPlan[0]?.amount === 899
          ) {
            //Basic Image File limit checked:
            if (checkBussinessHour.length < 1) {
              // Create a new image instance and save to MongoDB
              const newBussinessHour = new BussinessModel({
                user: req.user.userName,
                URL_Alies: req.params.URL_Alies,
                 Monday:{
                  from:req.body.Monday.from,
                  to:req.body.Monday.to
                 },
                 Tuesday:{
                  from:req.body.Tuesday.from,
                  to:req.body.Tuesday.to
                 },
                 Wednesday:{
                  from:req.body.Wednesday.from,
                  to:req.body.Wednesday.to
                 },
                 Thursday:{
                  from:req.body.Thursday.from,
                  to:req.body.Thursday.to
                 },
                 Friday:{
                  from:req.body.Friday.from,
                  to:req.body.Friday.to
                 },
                 Saturday:{
                  from:req.body.Saturday.from,
                  to:req.body.Saturday.to
                 },
                 Sunday:{
                  from:req.body.Sunday.from,
                  to:req.body.Sunday.to
                 },
              });
  
              newBussinessHour
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Bussiness Timing  uploaded!",
                    data: newBussinessHour,
                  });
                })
                .catch((err) => {
                  res.status(400).json({
                    message: "Failed to save Bussiness Timing to database!",
                  });
                });
            } else {
              res.status(400).json({
                message:
                  "Max Bussiness Timing upload limit crossed!..Only accept 1 Data Insert ",
              });
            }
          }
          if (checkFreePlan[0]?.PlanPrice === 0) {
            //Basic Image File limit checked:
            if (checkBussinessHour?.length < 0) {
              res.status(400).json({
                message: "Bussiness Timing Access denied for Trial Plan!",
             
              });
            } else {
              res.status(400).json({
                message: "Bussiness Timing Access denied for Trial Plan!",
              });
            }
          }
    
        }
      } else {
        res.status(400).json({ message: "Plan not match!" });
      };
    // if (checkCurrentPlan.length <= 0) {
    //    res.status(400).json({ message: "Choose your Plan first!" });
    // } else {


    // }

    // if (!checkSocialMediaLength) {
    //     // Create a new image instance and save to MongoDB
    //     const newSocialMedia = new BussinessModel({
    //       user: req.user.userName,
    //       URL_Alies: req.params.URL_Alies,
    //        Monday:{
    //         from:req.body.Monday.from,
    //         to:req.body.Monday.to
    //        },
    //        Tuesday:{
    //         from:req.body.Tuesday.from,
    //         to:req.body.Tuesday.to
    //        },
    //        Wednesday:{
    //         from:req.body.Wednesday.from,
    //         to:req.body.Wednesday.to
    //        },
    //        Thursday:{
    //         from:req.body.Thursday.from,
    //         to:req.body.Thursday.to
    //        },
    //        Friday:{
    //         from:req.body.Friday.from,
    //         to:req.body.Friday.to
    //        },
    //        Saturday:{
    //         from:req.body.Saturday.from,
    //         to:req.body.Saturday.to
    //        },
    //        Sunday:{
    //         from:req.body.Sunday.from,
    //         to:req.body.Sunday.to
    //        },

    //     });

    //     await newSocialMedia
    //       .save()
    //       .then(() => {
    //         res.status(200).json({
    //           message: "Bussiness Hour uploaded!",
    //           data: newSocialMedia,
    //         });
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         res.status(400).json({
    //           message: "Failed to save Bussiness Details!",
    //         });
    //       });
    // } else {
    //   //SocialMedia Image File limit checked:
    //   if (checkSocialMediaLength.length < 1) {
    //     // Create a new image instance and save to MongoDB
    //     const newSocialMedia = new BussinessModel({
    //       user: req.user.userName,
    //       URL_Alies: req.params.URL_Alies,
    //       Monday:{
    //         from:req.body.Monday.from,
    //         to:req.body.Monday.to
    //        },
    //        Tuesday:{
    //         from:req.body.Tuesday.from,
    //         to:req.body.Tuesday.to
    //        },
    //        Wednesday:{
    //         from:req.body.Wednesday.from,
    //         to:req.body.Wednesday.to
    //        },
    //        Thursday:{
    //         from:req.body.Thursday.from,
    //         to:req.body.Thursday.to
    //        },
    //        Friday:{
    //         from:req.body.Friday.from,
    //         to:req.body.Friday.to
    //        },
    //        Saturday:{
    //         from:req.body.Saturday.from,
    //         to:req.body.Saturday.to
    //        },
    //        Sunday:{
    //         from:req.body.Sunday.from,
    //         to:req.body.Sunday.to
    //        }
    //     });

    //     await newSocialMedia
    //       .save()
    //       .then(() => {
    //         res.status(200).json({
    //           message: "Bussiness Timing uploaded!",
    //           data: newSocialMedia,
    //         });
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         res.status(400).json({
    //           message: "Failed to save Bussiness Hour Details!",
    //         });
    //       });
    //   } else {
    //     res.status(400).json({
    //       message: "Already  your Bussiness Hour saved ! ",
    //     });
    //   }
    // }

};

//Read or get Specific User all Data  :
export const getSpecificUserAllData = async (req, res) => {
  try {
    let getSpecificData = await BussinessModel.find({
      URL_Alies: req.params.URL_Alies,
    });

    if (!getSpecificData) {
      res.status(200).json({
        message: "Data Not Found!",
        length: getSpecificData.length,
        data: getSpecificData,
      });
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
    let getSpecificData = await BussinessModel.findById(id);

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
    let updateSpecificData = await BussinessModel.findOneAndUpdate(
      { URL_Alies: req.params.URL_Alies },
      data
    );

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({
          message: "Bussiness Timing Updated!",
          data: updateSpecificData,
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Update Specific document with id:

export const updateSpecificUserData_id = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updateSpecificData = await BussinessModel.findByIdAndUpdate(id, data);

    if (!updateSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({
          message: "Bussiness Timing Updated!",
          data: updateSpecificData,
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Specific User Bssic detail All data deleted By using user Id:
export const deleteSpecificUserAllData = async (req, res) => {
  try {
    let deleteSpecificData = await BussinessModel.deleteMany({
      URL_Alies: req.params.URL_Alies,
    });

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({
          message: "Bussiness Timing Deleted!",
          data: deleteSpecificData,
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Spcific user  Document in Basic Detail:

export const deleteSpecificUserData = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteSpecificData = await BussinessModel.findByIdAndDelete(id);

    if (!deleteSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      res
        .status(201)
        .json({
          message: "Bussiness Timing Deleted!",
          data: deleteSpecificData,
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

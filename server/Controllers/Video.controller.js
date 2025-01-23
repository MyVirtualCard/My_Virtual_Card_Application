// Video Upload Endpoint
import Video_Model from "../Models/Video.model.js";
import { VideoUpload } from "../Multer/Video_Multer.js";
import Vcard_URL_model from "../Models/Vcard_URL.model.js";
import multer from "multer";
const uploadFields = VideoUpload.array("videos");
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
//POST
export const Create_VideoDetail = async (req, res) => {
  {
    uploadFields(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ error: "File size exceeds the 10MB limit." });
        }
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: "Error uploading file." });
      }

      try {
        let { URL_Alies } = req.body;
        const UserName = req.user.UserName;
        // Build the video object to push
        const uploadedVideos = req.files.map((file) => ({
          path: file.path,
          filename: file.originalname,
          uploadedAt: new Date(),
        }));
        let FindVideoDetails = await Video_Model.find({ URL_Alies });
        if (FindVideoDetails.length <= 0) {
          // Update the database, push video into Videos array
          const UpdateVideo = await Video_Model.updateOne(
            { UserName, URL_Alies},
            {
              $push: {
                videos: uploadedVideos,
              
              },
            },

            { upsert: true } // Create document if it doesn't exist
          );

          if (UpdateVideo.nModified === 0 && UpdateVideo.upserted) {
            return res.status(201).json({
              message: "New record created, and video added.",
              uploadedVideos,
            });
          }

          res
            .status(200)
            .json({ message: "Video uploaded successfully", UpdateVideo });
        } else {
          if (FindVideoDetails[0].videos.length < 5) {
            // Update the database, push video into videos array
            const UpdateVideo = await Video_Model.updateOne(
              {
                UserName,
                URL_Alies,
              
              },
              {
                $push: {
                  videos: uploadedVideos,
          
                },
              },

              { upsert: true } // Create document if it doesn't exist
              // { new: true }
            );

            if (UpdateVideo.nModified === 0 && UpdateVideo.upserted) {
              return res.status(201).json({
                message: "New record created, and video added.",
                uploadedVideos,
              });
            }

            res
              .status(200)
              .json({ message: "Video uploaded successfully", UpdateVideo });
          } else {
            return res
              .status(400)
              .json({ error: "You can only upload 5 videos." });
          }
        }
      } catch (err) {
        res
          .status(500)
          .json({ error: "Error uploading video", details: err.message });
      }
    });
  }
};
//Read or get  user Video data  from database:

export const Get_VideoDataWithURL = async (req, res) => {
  try {
    let datas = await Video_Model.find({ URL_Alies: req.params.URL_Alies });
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
//Delete Spcific user  Document in Basic Detail:
export const Delete_SpecificUserDataWithID = async (req, res) => {
  try {
    let { id } = req.params;

    let checkSpecificData = await Video_Model.findById(id);

    if (!checkSpecificData) {
      res.status(400).json({ message: "Data Not Found!" });
    } else {
      {
        checkSpecificData.videos.map((data, index) => {
          if (req.body.id === data.id) {
            fs.unlink(data.path, (err) => {
              if (err) {
                console.error("Failed to delete the old image:", err);
              }
            });
            checkSpecificData.videos.splice(index, 1);
          }
        });
        let remainVideos = await checkSpecificData.save();
        res.json(remainVideos.videos);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
//Delete Spcific user  Document in Basic Detail:
export const Update_SpecificUserDataWithID = async (req, res) => {
  {
    uploadFields(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ error: "File size exceeds the 10MB limit." });
        }
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: "Error uploading file." });
      }

      try {
        let { id } = req.params;

        let checkSpecificData = await Video_Model.findById(id);
        if (!checkSpecificData) {
          res.status(400).json({ message: "Data Not Found!" });
        } else {
          {
            checkSpecificData.videos.map(async (data, index) => {
              const { id } = req.body;

              // Build the video object to push
              const uploadedVideos = req.files?.map((file) => ({
                path: file.path,
                filename: file.originalname,
                uploadedAt: new Date(),
              }));

              if (id === data.id && uploadedVideos) {
                const videoIndex = checkSpecificData.videos.findIndex(
                  (video) => video.id === id
                );
                fs.unlink(data.path, (err) => {
                  if (err) {
                    console.error("Failed to delete the old image:", err);
                  }
                });

                if (videoIndex !== -1) {
                  checkSpecificData.videos[videoIndex] = uploadedVideos[0];
                  await checkSpecificData.save();

                  res.status(200).json({
                    message: "Video updated successfully",
                    data: checkSpecificData.videos,
                  });
                }
              }
            });
          }
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
      }
    });
  }
};

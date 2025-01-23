import express from "express";
import {
  Get_VideoDataWithURL,
  Create_VideoDataWithURL,
  Get_VideoDataWithID,
  Update_VideoDataWithID,
  Delete_SpecificUserAllVideoDataWithURL,
  Delete_VideoDataWithID,
} from "../Controllers/Youtube_Video.controller.js";
import { UserAuth } from "../Middleware/User.js";
let router = express.Router();

router.get("/:URL_Alies", UserAuth, Get_VideoDataWithURL);
router.post("/:URL_Alies", UserAuth, Create_VideoDataWithURL);
//Read Specific ID Data:
router.get("/specificID/:id", UserAuth, Get_VideoDataWithID);
//Update Specific user Single Data:
router.put("/updateID/:id", UserAuth, Update_VideoDataWithID);
//Delete Specific user all Data in Basic Detail:
router.delete(
  "/:URL_Alies",
  UserAuth,
  Delete_SpecificUserAllVideoDataWithURL
);
//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", UserAuth, Delete_VideoDataWithID);

export default router;

import express from "express";
import {
  GetGoogleMapData,
  PostGoogleMapData,

  updateSpecificUserData,
  getSpecificIdData,

  deleteSpecificUserData,
} from "../Controllers/GoogleMap.controller.js";

let router = express.Router();

import { UserAuth } from "../Middleware/User.js";
router.get("/:URL_Alies", UserAuth, GetGoogleMapData);
router.post("/:URL_Alies", UserAuth, PostGoogleMapData);

//Read Specific ID Data:
router.get("/specificID/:id", UserAuth, getSpecificIdData);
//Update Specific user Single Data:
router.put("/updateID/:id", UserAuth, updateSpecificUserData);

//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", UserAuth, deleteSpecificUserData);

export default router;

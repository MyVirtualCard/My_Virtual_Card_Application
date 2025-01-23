import express from "express";
import {
  getBasicAllData,
  postBasicAllData,
  readSpecificUserAllData,
  updateSpecificUserData_Id,
  readSpecificIdUserData,
  updateSpecificUserData,

  deleteSpecificUserAllData,
  deleteSpecificUserData,
} from "../Controllers/BasicDetail.controller.js";
import { UserAuth } from "../Middleware/User.js";

let router = express.Router();

//Get all basicDetails:
router.get("/", getBasicAllData);
router.post("/:URL_Alies",UserAuth, postBasicAllData);
//Read Specific user all Data:
router.get("/:URL_Alies", UserAuth, readSpecificUserAllData);
//Update Specific user Single Data:
router.put("/update_by_vcard_URL/:URL_Alies", UserAuth, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/delete_by_vcard_URL/:URL_Alies", UserAuth, deleteSpecificUserAllData);

//Read Specific user all Data:
router.get("/specific/:id", UserAuth, readSpecificIdUserData);
//Update Specific user Single Data:
router.put("/update/:id", UserAuth, updateSpecificUserData_Id);

//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", UserAuth, deleteSpecificUserData);

export default router;

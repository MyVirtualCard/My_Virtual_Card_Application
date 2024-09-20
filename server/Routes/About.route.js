import express from "express";
import {
  getAboutAllData,
  postAboutAllData,
  readSpecificUserAllData,
  updateSpecificUserData_Id,
  readSpecificIdUserData,
  updateSpecificUserData,
  deleteSpecificUserAllData,
  deleteSpecificUserData,
} from "../Controllers/About.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

let router = express.Router();

//Get all basicDetails:
router.get("/", verifyToken, getAboutAllData);
router.post("/:URL_Alies",verifyToken, postAboutAllData);
//Read Specific user all Data:
router.get("/:URL_Alies", verifyToken, readSpecificUserAllData);
//Update Specific user Single Data:
router.put("/update_by_vcard_URL/:URL_Alies", verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/delete_by_vcard_URL/:URL_Alies", verifyToken, deleteSpecificUserAllData);

//Read Specific user all Data:
router.get("/specific/:id", verifyToken, readSpecificIdUserData);
//Update Specific user Single Data:
router.put("/update/:id", verifyToken, updateSpecificUserData_Id);

//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserData);

export default router;

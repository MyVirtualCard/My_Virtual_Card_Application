import express from "express";
import {
  GetSocialMediaData,
  PostSocialMediaData,
  getSpecificUserAllData,
  getSpecificIdData,
  updateSpecificUserData,
  updateSpecificUserData_id,
  deleteSpecificUserAllData,
  deleteSpecificUserData,
} from "../Controllers/BussinessHour.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

let router = express.Router();

router.get("/:URL_Alies", verifyToken, GetSocialMediaData);
router.post("/:URL_Alies", verifyToken, PostSocialMediaData);
//Read Specific VCard Data:
//  router.get("/:URL_Alies", verifyToken, getSpecificIdData);
//Update Specific user :
router.put(
  "/update_by_vcard_URL/:URL_Alies",
  verifyToken,
  updateSpecificUserData
);
//Delete Specific user all Data in Basic Detail:
router.delete(
  "/delete_by_vcard_URL/:URL_Alies",
  verifyToken,
  deleteSpecificUserAllData
);

// //Update Specific user Single Data:
// router.put("/update/:id", verifyToken, updateSpecificUserData_id);

//  //Read Specific user all Data:
//  router.get("/specificAll/:userName", verifyToken, getSpecificUserAllData);

// //Delete Specific user document Data in Basic Detail:
// router.delete("/delete/:id", verifyToken, deleteSpecificUserData);

export default router;

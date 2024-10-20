import express from "express";
import {
  getAllVCardURLData,
  getVCardURLData,
  postVCardURLData,
  readSpecificUserAllData,
  updateSpecificUserData_Id,
  readSpecificIdUserData,
  updateSpecificUserData,
  deleteSpecificUserAllData,
  deleteSpecificUserData,
  deleteSpecificUserIdData
} from "../Controllers/VCardURL.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { upload } from "../Multer/Profile_Multer.js";
import { BasicUpload } from "../Multer/Basic_Multer.js";
let router = express.Router();
// Handle multiple file fields
const uploadFields = BasicUpload.fields([// One profile image
  { name: 'Banner', maxCount: 1 } // Up to 5 gallery images
]);
//Get all basicDetails:

router.get("/", getAllVCardURLData);
router.get("/:userName", verifyToken, getVCardURLData);
router.post(
  "/",
  verifyToken,
  postVCardURLData
);
//Read Specific user all Data:
router.get("/specific_vcard/:URL_Alies", verifyToken, readSpecificUserAllData);
//Update Specific user Single Data:
router.put(
  "/update_by_vcardUrl/:URL_Alies",
  verifyToken,
  updateSpecificUserData
);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:URL_Alies", verifyToken, deleteSpecificUserAllData);

//Read Specific user all Data:
router.get("/specific/:id", verifyToken, readSpecificIdUserData);
//Update Specific user Single Data:
router.put("/update/:id", verifyToken, updateSpecificUserData_Id);

//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", verifyToken, deleteSpecificUserData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserIdData);
export default router;

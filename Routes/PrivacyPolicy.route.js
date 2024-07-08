import express from "express";
import {
  GetPrivacyPolicyData,
  PostPrivacyPolicyData,
  getSpecificUserAllData,
  getSpecificIdData,
  updateSpecificUserData,
  deleteSpecificUserAllData,
  deleteSpecificUserData,
} from "../Controllers/PrivacyPolicy.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";
let router = express.Router();

router.get("/:URL_Alies", verifyToken, GetPrivacyPolicyData);
router.post("/:URL_Alies", verifyToken, PostPrivacyPolicyData);
//Update Specific user Single Data:
router.put("/update/:URL_Alies", verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:URL_Alies", verifyToken, deleteSpecificUserAllData);




//Read Specific user all Data:
router.get("/specificAll/:userName", verifyToken, getSpecificUserAllData);
//Read Specific ID Data:
router.get("/specific/:id", verifyToken, getSpecificIdData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserData);

export default router;

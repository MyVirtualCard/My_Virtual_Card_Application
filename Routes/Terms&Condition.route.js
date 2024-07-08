import express from "express";
import {
  GetTermConditionsData,
  PostTermConditionsData,
  getSpecificUserAllData,
  getSpecificIdData,
  updateSpecificUserData,
  deleteSpecificUserAllData,
  deleteSpecificUserData,
} from "../Controllers/Terms&Condition.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";
let router = express.Router();

router.get("/:URL_Alies", verifyToken, GetTermConditionsData);
router.post("/:URL_Alies", verifyToken, PostTermConditionsData);
//Update Specific user Single Data:
router.put("/update/:URL_Alies", verifyToken, updateSpecificUserData);




//Read Specific user all Data:
router.get("/specificAll/:userName", verifyToken, getSpecificUserAllData);
//Read Specific ID Data:
router.get("/specific/:id", verifyToken, getSpecificIdData);

//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:URL_Alies", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserData);

export default router;

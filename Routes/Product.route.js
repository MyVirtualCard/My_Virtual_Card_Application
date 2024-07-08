import express from "express";
import {
  GetProductData,
  PostProductData,
  readSpecificUserAllData,
  updateSpecificUserData,
  getSpecificIdData,
  deleteSpecificUserAllData,
  deleteSpecificUserData,
} from "../Controllers/Product.controller.js";

let router = express.Router();
import { verifyToken } from "../Middleware/verifyToken.js";
router.get("/:URL_Alies", verifyToken, GetProductData);
router.post("/:URL_Alies", verifyToken, PostProductData);
//Read Specific user all Data:
// router.get("/specificAll/:userName", verifyToken, readSpecificUserAllData);
//Read Specific ID Data:
router.get("/specificID/:id", verifyToken, getSpecificIdData);
//Update Specific user Single Data:
router.put("/updateID/:id", verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
// router.delete("/deleteAll/:userName", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", verifyToken, deleteSpecificUserData);

export default router;

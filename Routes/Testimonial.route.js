import express from "express";
import {
  getTestimonialData,
  postTestimonialData,
  getSpecificUserAllData,
  getSpecificIdData,
  updateSpecificUserData,
  deleteSpecificUserAllData,
  deleteSpecificUserData,
} from "../Controllers/Testimonial.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";
let router = express.Router();

router.get("/:URL_Alies", verifyToken, getTestimonialData);
router.post("/:URL_Alies", verifyToken, postTestimonialData);
//Read Specific user all Data:
// router.get("/specificAll/:userName", verifyToken, getSpecificUserAllData);
//Read Specific ID Data:
router.get("/specificID/:id", verifyToken, getSpecificIdData);
//Update Specific user Single Data:
router.put("/updateID/:id", verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", verifyToken, deleteSpecificUserData);

export default router;

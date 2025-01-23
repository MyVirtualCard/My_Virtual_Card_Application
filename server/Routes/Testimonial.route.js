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
import { UserAuth } from "../Middleware/User.js";
let router = express.Router();

router.get("/:URL_Alies", UserAuth, getTestimonialData);
router.post("/:URL_Alies", UserAuth, postTestimonialData);
//Read Specific ID Data:
router.get("/specificID/:id", UserAuth, getSpecificIdData);
//Update Specific user Single Data:
router.put("/updateID/:id", UserAuth, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", UserAuth, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", UserAuth, deleteSpecificUserData);

export default router;

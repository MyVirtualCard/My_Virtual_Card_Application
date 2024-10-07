import express from "express";
import {
  CreateTestimonialThemeData,
  readUserTestimonialThemeData,
  updateUserTestimonialThemeData,
  deleteUserTestimonialThemeData,
} from "../../Controllers/Dynamic_Vcard_Controllers/Eight_Testimonial.controller.js";

import { verifyToken } from "../../Middleware/verifyToken.js";
let router = express.Router();

//Routes:
router.post("/:URL_Alies", verifyToken, CreateTestimonialThemeData);
router.get("/:URL_Alies", verifyToken, readUserTestimonialThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies", verifyToken, updateUserTestimonialThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", verifyToken, deleteUserTestimonialThemeData);

export default router;

import express from "express";
import {
  CreateTestimonialThemeData,
  readUserTestimonialThemeData,
  updateUserTestimonialThemeData,
  deleteUserTestimonialThemeData,
} from "../../Controllers/Dynamic_Vcard_Controllers/Eight_Testimonial.controller.js";

import { UserAuth } from '../../Middleware/User.js';
let router = express.Router();

//Routes:
router.post("/:URL_Alies", UserAuth, CreateTestimonialThemeData);
router.get("/:URL_Alies", UserAuth, readUserTestimonialThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies", UserAuth, updateUserTestimonialThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", UserAuth, deleteUserTestimonialThemeData);

export default router;

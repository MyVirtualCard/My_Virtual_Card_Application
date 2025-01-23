import express from "express";
import {
  CreateFeedbackThemeData,
  readUserFeedbackThemeData,
  updateUserFeedbackThemeData,
  deleteUserFeedbackThemeData,
} from "../../Controllers/Dynamic_Vcard_Controllers/Tenth_Feedback.controller.js";

import { UserAuth } from '../../Middleware/User.js';
let router = express.Router();

//Routes:
router.post("/:URL_Alies", UserAuth, CreateFeedbackThemeData);
router.get("/:URL_Alies", UserAuth, readUserFeedbackThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies", UserAuth, updateUserFeedbackThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", UserAuth, deleteUserFeedbackThemeData);

export default router;

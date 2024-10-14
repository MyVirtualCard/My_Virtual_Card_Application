import express from "express";
import {
  CreateFeedbackThemeData,
  readUserFeedbackThemeData,
  updateUserFeedbackThemeData,
  deleteUserFeedbackThemeData,
} from "../../Controllers/Dynamic_Vcard_Controllers/Tenth_Feedback.controller.js";

import { verifyToken } from "../../Middleware/verifyToken.js";
let router = express.Router();

//Routes:
router.post("/:URL_Alies", verifyToken, CreateFeedbackThemeData);
router.get("/:URL_Alies", verifyToken, readUserFeedbackThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies", verifyToken, updateUserFeedbackThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", verifyToken, deleteUserFeedbackThemeData);

export default router;

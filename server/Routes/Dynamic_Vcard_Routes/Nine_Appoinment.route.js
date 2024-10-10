import express from "express";
import {
  CreateAppoinmentThemeData,
  readUserAppoinmentThemeData,
  updateUserAppoinmentThemeData,
  deleteUserAppoinmentThemeData,
} from "../../Controllers/Dynamic_Vcard_Controllers/Nine_Appoinment.controller.js";

import { verifyToken } from "../../Middleware/verifyToken.js";
let router = express.Router();

//Routes:
router.post("/:URL_Alies", verifyToken, CreateAppoinmentThemeData);
router.get("/:URL_Alies", verifyToken, readUserAppoinmentThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies", verifyToken, updateUserAppoinmentThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", verifyToken, deleteUserAppoinmentThemeData);

export default router;

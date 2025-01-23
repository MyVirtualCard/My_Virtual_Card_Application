import express from "express";
import {
  CreateAppoinmentThemeData,
  readUserAppoinmentThemeData,
  updateUserAppoinmentThemeData,
  deleteUserAppoinmentThemeData,
} from "../../Controllers/Dynamic_Vcard_Controllers/Nine_Appoinment.controller.js";

import { UserAuth } from '../../Middleware/User.js';
let router = express.Router();

//Routes:
router.post("/:URL_Alies", UserAuth, CreateAppoinmentThemeData);
router.get("/:URL_Alies", UserAuth, readUserAppoinmentThemeData);
//Update Specific user Single Data:
router.put("/:URL_Alies", UserAuth, updateUserAppoinmentThemeData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", UserAuth, deleteUserAppoinmentThemeData);

export default router;

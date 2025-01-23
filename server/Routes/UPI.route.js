import express from "express";
import {
  Get_UPIDataWithURL,
  Create_UPIData,
  Update_SpecificUserDataWithURL,
  Delete_SpecificUserDataWithURL,
} from "../Controllers/UPI.controller.js";

import { UserAuth } from "../Middleware/User.js";
let router = express.Router();

//Get all basicDetails:
router.get("/:URL_Alies", UserAuth, Get_UPIDataWithURL);
router.post("/:URL_Alies", UserAuth, Create_UPIData);
//Update Specific user Single Data:
router.put("/:URL_Alies", UserAuth, Update_SpecificUserDataWithURL);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", UserAuth, Delete_SpecificUserDataWithURL);

export default router;

import express from "express";
import {
  Get_BankDetails,
  Create_BankDetails,
  Update_SpecificDataWithURL,
  Delete_SpecificDataWithURL,
} from "../Controllers//BankDetail.controller.js";

import { UserAuth } from "../Middleware/User.js";
let router = express.Router();

//Get all basicDetails:
router.get("/:URL_Alies", UserAuth, Get_BankDetails);
router.post("/:URL_Alies", UserAuth, Create_BankDetails);
//Update Specific user Single Data:
router.put("/:URL_Alies", UserAuth, Update_SpecificDataWithURL);
//Delete Specific user all Data in Basic Detail:
router.delete(
  "/:URL_Alies",
  UserAuth,
  Delete_SpecificDataWithURL
);


export default router;

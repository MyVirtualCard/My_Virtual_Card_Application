import express from "express";
import {
  CreateVCardURLData,
  getAllVCardURLData,
  getSpecificUserVCardURLData,
  readSpecificUserDataWithURL,
  updateSpecificUserData,
} from "../Controllers/Vcard_URL.controller.js";

import { UserAuth } from "../Middleware/User.js";
let router = express.Router();

//Get all basicDetails:
router.post("/", UserAuth, CreateVCardURLData);
router.get("/", getAllVCardURLData);
router.get("/:UserName", UserAuth, getSpecificUserVCardURLData);
router.get("/specific_vcard/:URL_Alies", UserAuth, readSpecificUserDataWithURL);
router.put("/update_by_vcardUrl/:URL_Alies", UserAuth, updateSpecificUserData);
export default router;

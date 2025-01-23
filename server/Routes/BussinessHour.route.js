import express from "express";
import {
  GetSocialMediaData,
  PostSocialMediaData,
  updateSpecificUserData,
  deleteSpecificUserAllData,

} from "../Controllers/BussinessHour.controller.js";

import { UserAuth } from "../Middleware/User.js";

let router = express.Router();

router.get("/:URL_Alies", UserAuth, GetSocialMediaData);
router.post("/:URL_Alies", UserAuth, PostSocialMediaData);

//Update Specific user :
router.put(
  "/update_by_vcard_URL/:URL_Alies",
  UserAuth,
  updateSpecificUserData
);
//Delete Specific user all Data in Basic Detail:
router.delete(
  "/delete_by_vcard_URL/:URL_Alies",
  UserAuth,
  deleteSpecificUserAllData
);


export default router;

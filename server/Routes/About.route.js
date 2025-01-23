import express from "express";
import {
    Get_AboutAllData,
    Post_AboutData,
    Get_SpecificUserDataWithURL,
  Update_SpecificUserDataWithURL,
  Delete_SpecificUserDataWithURL,
} from "../Controllers/About.controller.js";

import { UserAuth } from "../Middleware/User.js";
let router = express.Router();

//Get all basicDetails:
router.get("/", Get_AboutAllData);
router.post("/:URL_Alies",UserAuth, Post_AboutData);
//Read Specific user  Data:
router.get("/:URL_Alies", UserAuth, Get_SpecificUserDataWithURL);
//Update Specific user Single Data:
router.put("/:URL_Alies", UserAuth, Update_SpecificUserDataWithURL);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", UserAuth, Delete_SpecificUserDataWithURL);


export default router;

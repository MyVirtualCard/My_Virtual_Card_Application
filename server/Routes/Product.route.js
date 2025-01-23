import express from "express";
import {
  Get_ProductDataWithURL,
  Post_ProductDataWithURL,
  Update_SpecificUserDataWithID,
  Get_SpecificUserDataWithID,
  Delete_SpecificUserDataWithID,
  Delete_SpecificUserAllDataWithURL,
} from "../Controllers/Product.controller.js";

let router = express.Router();
import { UserAuth } from "../Middleware/User.js";

router.get("/:URL_Alies", UserAuth, Get_ProductDataWithURL);
router.post("/:URL_Alies", UserAuth, Post_ProductDataWithURL);
//Read Specific ID Data:
router.get("/specificId/:id", UserAuth, Get_SpecificUserDataWithID);
//Update Specific user Single Data:
router.put("/:id", UserAuth, Update_SpecificUserDataWithID);
//Delete Specific user document Data in Basic Detail:
router.delete("/:id", UserAuth, Delete_SpecificUserDataWithID);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:URL_Alies", UserAuth, Delete_SpecificUserAllDataWithURL);
export default router;

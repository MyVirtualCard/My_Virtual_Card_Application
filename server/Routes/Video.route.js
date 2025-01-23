import express from 'express';
import { Create_VideoDetail,Get_VideoDataWithURL,Delete_SpecificUserDataWithID,Update_SpecificUserDataWithID } from '../Controllers/Video.controller.js';
import multer from 'multer';
import path from 'path';
import { UserAuth } from "../Middleware/User.js";
let router=express.Router();


router.post('/:URL_Alies',UserAuth,  Create_VideoDetail);
router.get("/:URL_Alies", UserAuth, Get_VideoDataWithURL);
//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", UserAuth, Delete_SpecificUserDataWithID);
//Update Specific user document Data in Basic Detail:
router.put("/updateID/:id", UserAuth, Update_SpecificUserDataWithID);
export default router;
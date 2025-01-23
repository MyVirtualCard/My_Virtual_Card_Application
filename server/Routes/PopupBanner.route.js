import express from 'express';
import {  PostPopupBannerData,readSpecificUserData,getSpecificIdData,updateSpecificUserData,deleteSpecificUserAllData,deleteSpecificUserData } from '../Controllers/PopupBanner.controller.js';

import { UserAuth } from "../Middleware/User.js";
let router=express.Router();

router.get("/:URL_Alies",UserAuth, readSpecificUserData);
// router.get('/',GetPopupBannerData);
router.post('/:URL_Alies',UserAuth,PostPopupBannerData);
//Read Specific user all Data:
router.get("/specific/:id",UserAuth, getSpecificIdData);
//Update Specific user Single Data:
router.put("/update/:URL_Alies",UserAuth, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:URL_Alies",UserAuth, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id",UserAuth, deleteSpecificUserData);
export default router;
import express from 'express';
import {  PostPopupBannerData,readSpecificUserData,getSpecificIdData,updateSpecificUserData,deleteSpecificUserAllData,deleteSpecificUserData } from '../Controllers/PopupBanner.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();

router.get("/:URL_Alies",verifyToken, readSpecificUserData);
// router.get('/',GetPopupBannerData);
router.post('/:URL_Alies',verifyToken,PostPopupBannerData);
//Read Specific user all Data:
router.get("/specific/:id",verifyToken, getSpecificIdData);
//Update Specific user Single Data:
router.put("/update/:URL_Alies",verifyToken, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:URL_Alies",verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id",verifyToken, deleteSpecificUserData);
export default router;
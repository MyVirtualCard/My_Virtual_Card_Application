import express from 'express';
import {  PostInquiryData,readSpecificUserData,getSpecificIdData,updateSpecificUserData,deleteSpecificUserAllData,deleteSpecificUserData } from '../Controllers/Inquiry.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();

router.get("/:URL_Alies", readSpecificUserData);
// router.get('/',GetPopupBannerData);
router.post('/:URL_Alies',PostInquiryData);
//Read Specific user all Data:
router.get("/specific/:id", getSpecificIdData);
//Update Specific user Single Data:
router.put("/update/:URL_Alies", updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", deleteSpecificUserData);

export default router;
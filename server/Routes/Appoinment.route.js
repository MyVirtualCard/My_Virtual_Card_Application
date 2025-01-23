import express from 'express';
import {  PostAppoinmentData,readSpecificUserData,getSpecificIdData,updateSpecificUserData,deleteSpecificUserAllData,deleteSpecificUserData } from '../Controllers/Appoinment.controller.js';
let router=express.Router();

router.get("/:URL_Alies", readSpecificUserData);
// router.get('/',GetPopupBannerData);
router.post('/:URL_Alies',PostAppoinmentData);
//Read Specific user all Data:
router.get("/specific/:id", getSpecificIdData);
//Update Specific user Single Data:
router.put("/update/:URL_Alies", updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:URL_Alies", deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", deleteSpecificUserData);

export default router;
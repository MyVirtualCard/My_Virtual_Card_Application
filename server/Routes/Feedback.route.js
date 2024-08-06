import express from 'express';
import { GetFeedbackData, PostFeedbackData,readSpecificUserData,getSpecificIdData,updateSpecificUserData,deleteSpecificUserData,deleteSpecificIdData } from '../Controllers/Feedback.controller.js';
let router=express.Router();


router.get('/:URL_Alies',GetFeedbackData);
router.post('/:URL_Alies',PostFeedbackData);
 //Read Specific user all Data:
//  router.get("/specificAll/:userName", verifyToken, readSpecificUserAllData);
 //Read Specific user all Data:
 router.get("/specificID/:id",getSpecificIdData);
//Update Specific user Single Data:
router.put("/updateID/:id",updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies",deleteSpecificUserData);
//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", deleteSpecificIdData);

export default router;

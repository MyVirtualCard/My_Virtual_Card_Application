import express from 'express';
import { GetServiceData, PostServiceData,  
    getSpecificUserAllData,
    getSpecificIdData,
    updateSpecificUserData,
    deleteSpecificUserAllData,
    deleteSpecificUserData,deleteSpecificUserIdData } from '../Controllers/Service.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
import { ServiceUpload } from '../Multer/Service_Multer.js';


let router=express.Router();



router.get('/:URL_Alies',verifyToken,GetServiceData);
router.post('/:URL_Alies',verifyToken,PostServiceData);
 //Read Specific user all Data:
//  router.get("/specificAll/:userName", verifyToken, getSpecificUserAllData);
 //Read Specific ID Data:
 router.get("/specificID/:id", verifyToken, getSpecificIdData);
//Update Specific user Single Data:
router.put("/updateID/:id", verifyToken,updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", verifyToken, deleteSpecificUserData);
//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", verifyToken, deleteSpecificUserIdData);

export default router;
import express from 'express';
import { getTemplateData, postTemplateData,  
    getSpecificUserAllData,
    getSpecificUserNameData,
    updateSpecificUserData_id,
    updateSpecificUserData,
    deleteSpecificUserAllData,
    deleteSpecificUserData } from '../Controllers/VCardTemplate.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';
let router=express.Router();


router.get('/:URL_Alies',verifyToken,getTemplateData);
router.post('/:URL_Alies',verifyToken,postTemplateData);
 //Read Specific user all Data:
 router.get("/specificAll/:URL_Alies", verifyToken, getSpecificUserAllData);
 //Read Specific ID Data:
 router.get("/specific/:userName", verifyToken, getSpecificUserNameData);
 //Update Specific user Single Data:
router.put("/update_with_URL/:URL_Alies", verifyToken, updateSpecificUserData);
//Update Specific user Single Data:
router.put("/update_with_id/:id", verifyToken, updateSpecificUserData_id);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:URL_Alies", verifyToken, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", verifyToken, deleteSpecificUserData);


export default router;
import express from 'express';
import { getTemplateData, postTemplateData,  
    getSpecificUserAllData,
    getSpecificUserNameData,
    updateSpecificUserData_id,
    updateSpecificUserData,
    deleteSpecificUserAllData,
    deleteSpecificUserData } from '../Controllers/VCardTemplate.controller.js';
    import { UserAuth } from "../Middleware/User.js";
let router=express.Router();


router.get('/:URL_Alies',getSpecificUserAllData);
router.post('/:URL_Alies',UserAuth,postTemplateData);
 //Read Specific user all Data:
 router.get("/specificAll",UserAuth, getTemplateData);
 //Read Specific ID Data:
 router.get("/specific/:userName",UserAuth, getSpecificUserNameData);
 //Update Specific user Single Data:
router.put("/update_with_URL/:URL_Alies", UserAuth, updateSpecificUserData);
//Update Specific user Single Data:
router.put("/update_with_id/:id", UserAuth, updateSpecificUserData_id);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:URL_Alies", UserAuth, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", UserAuth, deleteSpecificUserData);


export default router;
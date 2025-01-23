import express from 'express';
import { Get_ServiceDataWithURL, Create_ServiceData,  
    Get_SpecificUserDataWithID,
    Update_SpecificUserDataWithID,
    Delete_SpecificUserAllDataWithURL,
    Delete_SpecificUserDataWithID } from '../Controllers/Service.controller.js';
    import { UserAuth } from "../Middleware/User.js";

let router=express.Router();
router.get('/:URL_Alies',UserAuth,Get_ServiceDataWithURL);

router.post('/:URL_Alies',UserAuth,Create_ServiceData);
 //Read Specific ID Data:
 router.get("/specificID/:id", UserAuth, Get_SpecificUserDataWithID);
//Update Specific user Single Data:
router.put("/updateID/:id", UserAuth,Update_SpecificUserDataWithID);
//Delete Specific user all Data in Basic Detail:
router.delete("/:URL_Alies", UserAuth, Delete_SpecificUserAllDataWithURL);
//Delete Specific user document Data in Basic Detail:
router.delete("/deleteID/:id", UserAuth, Delete_SpecificUserDataWithID);

export default router;
import express from 'express';
import { GetPlanData, PostPlanData,readSpecificUserAllData,getSpecificIdData,updateSpecificUserData,deleteSpecificUserAllData,deleteSpecificUserData } from '../Controllers/FreePlan.controller.js';
import { UserAuth } from "../Middleware/User.js";
let router=express.Router();




router.get('/:URL_Alies',UserAuth,GetPlanData);

router.post('/',UserAuth,PostPlanData);
 //Read Specific user all Data:
 router.get("/specificAll/:UserName",UserAuth, readSpecificUserAllData);
 //Read Specific user all Data:
 router.get("/specific/:UserName", getSpecificIdData);
//Update Specific user Single Data:
router.put("/update/:id", UserAuth, updateSpecificUserData);
//Delete Specific user all Data in Basic Detail:
router.delete("/deleteAll/:UserName", UserAuth, deleteSpecificUserAllData);
//Delete Specific user document Data in Basic Detail:
router.delete("/delete/:id", UserAuth, deleteSpecificUserData);

export default router;